import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, User } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { initiateRazorpayPayment, createRazorpayOrder, RazorpaySuccessResponse } from '../services/razorpay';
import { createShopifyOrder } from '../services/orders';
import { createShipment } from '../services/bigship';
import ProcessingOverlay from './ProcessingOverlay';
import CouponInput from './CouponInput';


const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrder, isLoading, error, updateCustomerInfo, updateShippingAddress, addToOrderHistory } = useOrderStore();
  const { clearCart } = useCartStore();
  const { customer } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    email: customer?.email || '',
    phone: (customer as any)?.phone || '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    zip: '',
    country: 'India'
  });
  const [countryCode, setCountryCode] = useState('+91');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  const finalAmount = currentOrder ? currentOrder.totalAmount - discount : 0;

  useEffect(() => {
    if (!currentOrder) {
      navigate('/shop');
    }
  }, [currentOrder, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleApplyCoupon = async (code: string) => {
    // Remove coupon if empty code
    if (!code) {
      setAppliedCoupon('');
      setDiscount(0);
      return { success: true };
    }

    // For testing: Fixed ₹6489 discount
    if (code === 'TESTFREEDEV468864' && currentOrder) {
      const discountAmount = 6489;
      setAppliedCoupon(code);
      setDiscount(discountAmount);
      return { success: true, discount: discountAmount };
    }

    return { success: false, message: 'Invalid coupon code' };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address1.trim()) newErrors.address1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province.trim()) newErrors.province = 'State/Province is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }

    if (!currentOrder) {
      setSubmitError('Order not found. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      const fullPhone = `${countryCode}${formData.phone}`;
      
      updateCustomerInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: fullPhone
      });

      updateShippingAddress({
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        province: formData.province,
        country: formData.country,
        zip: formData.zip
      });

      // Create Shopify order
      const shopifyOrderResult = await createShopifyOrder(
        {
          items: currentOrder.items,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: fullPhone
          },
          shippingAddress: {
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            province: formData.province,
            country: formData.country,
            zip: formData.zip
          },
          totalAmount: currentOrder.totalAmount,
          currency: 'INR'
        },
        'pending'
      );

      if (!shopifyOrderResult.success) {
        setSubmitError('Failed to create order. Please try again.');
        return;
      }

      const shopifyOrderId = shopifyOrderResult.orderId;
      const shopifyOrderNumber = shopifyOrderResult.orderNumber;

      // Create Razorpay order with final amount after discount
      const razorpayOrderId = await createRazorpayOrder(
        finalAmount * 100,
        'INR',
        shopifyOrderNumber || shopifyOrderId
      );

      // Initiate payment
      await initiateRazorpayPayment({
        amount: finalAmount * 100,
        currency: 'INR',
        orderId: razorpayOrderId,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: fullPhone
        },
        onSuccess: async (response: RazorpaySuccessResponse) => {
          console.log('Payment successful:', response);
          console.log('Shopify Order Number:', shopifyOrderNumber);
          console.log('Shopify Order ID:', shopifyOrderId);
          
          setIsProcessing(true);
          
          try {
            // 1. Verify payment with backend
            console.log('Verifying payment...');
            const verifyResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/razorpay/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();
            
            if (!verifyData.success || !verifyData.verified) {
              throw new Error('Payment verification failed');
            }

            console.log('Payment verified successfully');

            // 2. Complete draft order and send invoice
            console.log('Completing order and sending invoice...');
            const completeResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/shopify/complete-order`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                draftOrderId: shopifyOrderId,
                paymentId: response.razorpay_payment_id
              })
            });

            const completeData = await completeResponse.json();
            
            if (!completeData.success) {
              throw new Error('Failed to complete order');
            }

            console.log('Order completed and invoice sent:', completeData);

            // 3. Create complete order object
            const completedOrder = {
              id: completeData.orderId,
              orderNumber: completeData.orderNumber,
              orderId: completeData.orderId,
              paymentId: response.razorpay_payment_id,
              status: 'confirmed',
              totalAmount: currentOrder.totalAmount,
              items: currentOrder.items,
              customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
              },
              shippingAddress: {
                address1: formData.address1,
                address2: formData.address2,
                city: formData.city,
                province: formData.province,
                country: formData.country,
                zip: formData.zip
              },
              createdAt: new Date().toISOString(),
              bigshipShipmentId: undefined,
              awbNumber: undefined
            };

            // 4. Save to order history with tracking
            addToOrderHistory(completedOrder);

            // 5. Clear cart
            clearCart();

            // 6. Create BigShip shipment
            try {
              console.log('Creating BigShip shipment...');
              const shipmentResult = await createShipment(completedOrder);
              console.log('BigShip shipment created:', shipmentResult);
              
              const trackingInfo = {
                bigshipShipmentId: shipmentResult.shipmentId,
                awbNumber: shipmentResult.awbNumber,
                courierName: shipmentResult.courierName,
                lrnNumber: shipmentResult.lrnNumber
              };
              
              // Update completed order with tracking
              Object.assign(completedOrder, trackingInfo);
              
              // Update order history with tracking
              const store = useOrderStore.getState();
              store.updateOrderWithTracking(completeData.orderNumber, trackingInfo);
              
              // Update Shopify order with tracking info
              await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/shopify/update-order-tracking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: completeData.orderId,
                  awbNumber: shipmentResult.awbNumber,
                  courierName: shipmentResult.courierName,
                  lrnNumber: shipmentResult.lrnNumber,
                  paymentId: response.razorpay_payment_id
                })
              });
            } catch (error) {
              console.error('Failed to create BigShip shipment:', error);
            }

            // 7. Navigate to thank you page
            console.log('=== NAVIGATING TO THANK YOU PAGE ===');
            console.log('Order Number:', completeData.orderNumber);
            console.log('=======================================');
            navigate(`/thank-you?orderId=${encodeURIComponent(completeData.orderNumber)}`);
          } catch (error) {
            console.error('Error in payment success handler:', error);
            setSubmitError('Payment successful but order completion failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },        
        onFailure: (error) => {
          console.error('Payment failed:', error);
          setSubmitError(error.description || 'Payment failed. Please try again.');
          // Navigate to error page
          navigate('/error');
        }
      });
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[32px] leading-[36px] uppercase mb-6" style={{ 
            fontFamily: 'Bebas Neue',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>No items in cart</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer mx-auto"
            style={{ width: '200px', height: '46px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[13px] leading-[16px] uppercase font-medium">Continue Shopping</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isProcessing && <ProcessingOverlay />}
      <div className="min-h-screen bg-black py-8 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[3px] border-[#02FF00] group relative overflow-hidden cursor-pointer mb-6"
            style={{ width: '160px', height: '46px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <ArrowLeft className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[13px] leading-[16px] uppercase font-medium">Back to Shop</span>
          </button>
          <h1 className="text-[48px] leading-[48px] uppercase" style={{ 
            fontFamily: 'Bebas Neue',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-[#02FF00] mr-2" />
                  <h2 className="text-[24px] leading-[24px] uppercase text-white" style={{ fontFamily: 'Bebas Neue' }}>Customer Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                        errors.firstName ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                        errors.lastName ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                        errors.email ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                      Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-24 px-2 py-2 bg-[#393737] text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00]"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+971">+971</option>
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="1234567890"
                        className={`flex-1 px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                          errors.phone ? 'border-red-500' : 'border-white/30'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-[#02FF00] mr-2" />
                  <h2 className="text-[24px] leading-[24px] uppercase text-white" style={{ fontFamily: 'Bebas Neue' }}>Shipping Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address1" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                        errors.address1 ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address2" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#393737] text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                          errors.city ? 'border-red-500' : 'border-white/30'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="province" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                          errors.province ? 'border-red-500' : 'border-white/30'
                        }`}
                      />
                      {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="zip" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-[#393737] text-white border rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] ${
                          errors.zip ? 'border-red-500' : 'border-white/30'
                        }`}
                      />
                      {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#393737] text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00]"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-[#02FF00] mr-2" />
                  <h2 className="text-[24px] leading-[24px] uppercase text-white" style={{ fontFamily: 'Bebas Neue' }}>Payment</h2>
                </div>
                
                <div className="bg-[#393737] border border-[#02FF00]/30 rounded-lg p-4">
                  <p className="text-white text-sm" style={{ fontFamily: 'DM Sans' }}>
                    <strong>Payment will be processed securely via Razorpay</strong>
                  </p>
                  <p className="text-[#02FF00] text-xs mt-1" style={{ fontFamily: 'DM Sans' }}>
                    You will be redirected to Razorpay's secure payment gateway after clicking "Place Order"
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || isProcessing}
                className="w-full bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ height: '56px', fontFamily: 'DM Sans', fontSize: '16px' }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 uppercase font-medium">
                  {isProcessing ? 'Processing Order...' : isLoading ? 'Loading...' : 'Place Order'}
                </span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6 sticky top-8">
              <h2 className="text-[24px] leading-[24px] uppercase text-white mb-4" style={{ fontFamily: 'Bebas Neue' }}>Order Summary</h2>
              
              <div className="space-y-4">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate" style={{ fontFamily: 'DM Sans' }}>{item.title}</p>
                      <p className="text-sm text-[#02FF00]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-white" style={{ fontFamily: 'DM Sans' }}>₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              {/* Coupon Input */}
              <div className="border-t border-white/30 pt-4 mt-4">
                <CouponInput 
                  onApplyCoupon={handleApplyCoupon}
                  appliedCoupon={appliedCoupon}
                  discount={discount}
                />
              </div>

              <div className="border-t border-white/30 pt-4 mt-4">
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Subtotal</span>
                    <span>₹{currentOrder.totalAmount}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-[#02FF00] mb-2">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg text-white" style={{ fontFamily: 'Bebas Neue', fontSize: '24px' }}>
                  <span>Total</span>
                  <span className="text-[#02FF00]">₹{finalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
