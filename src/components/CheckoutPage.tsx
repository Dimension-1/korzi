import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrder, placeOrder, isLoading, error, updateCustomerInfo, updateShippingAddress, setCurrentOrder } = useOrderStore();
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');

  // Helper function to fill form with test data
  const fillTestData = () => {
    setFormData({
      firstName: 'Test',
      lastName: 'Customer',
      email: 'test@example.com',
      phone: '+1234567890',
      address1: '123 Test Street',
      address2: 'Apt 1',
      city: 'Test City',
      province: 'Test State',
      zip: '12345',
      country: 'India'
    });
    setErrors({});
    setSubmitError('');
  };

  useEffect(() => {
    // Redirect if no order data
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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

    console.log('Form data being validated:', formData);
    console.log('Validation errors:', newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted, validating...');
    setSubmitError(''); // Clear previous errors
    
    if (!validateForm()) {
      console.log('Form validation failed - please fill all required fields');
      console.log('Missing required fields:', Object.keys(errors));
      return;
    }

    console.log('Form validation passed, starting order placement...');

    try {
      // Update order with customer and shipping info
      updateCustomerInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      });

      updateShippingAddress({
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        province: formData.province,
        country: formData.country,
        zip: formData.zip
      });

      // Ensure current order has all the updated information
      if (currentOrder) {
        const updatedOrder = {
          ...currentOrder,
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
          }
        };
        
        console.log('Updated order data:', updatedOrder);
        
        // Set the complete updated order
        setCurrentOrder(updatedOrder);
      } else {
        console.error('No current order found!');
        return;
      }

      console.log('Placing order...');
      
      // Place the order
      const result = await placeOrder();
      
      console.log('=== ORDER PLACEMENT RESULT ===');
      console.log('Success:', result.success);
      console.log('Order ID:', result.orderId);
      console.log('Order Number:', result.orderNumber);
      console.log('Errors:', result.errors);
      console.log('Full API Response:', result);
      console.log('================================');
      
      if (result.success) {
        console.log('Order placed successfully, clearing cart and navigating...');
        // Clear cart after successful order
        clearCart();
        // Navigate to order confirmation
        navigate(`/order-confirmation/${result.orderId}`);
      } else {
        console.error('Order placement failed:', result.errors);
        setSubmitError(result.errors?.join(', ') || 'Order placement failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No items in cart</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <button
              onClick={fillTestData}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
            >
              Fill Test Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.address1 ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.province ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.zip ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Payment will be processed securely via Razorpay</strong>
                  </p>
                  <p className="text-blue-600 text-xs mt-1">
                    You will be redirected to Razorpay's secure payment gateway after clicking "Place Order"
                  </p>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Error Display */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{submitError}</p>
                </div>
              )}

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
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
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{currentOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
