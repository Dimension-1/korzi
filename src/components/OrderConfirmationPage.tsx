import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import ShipmentTracking from './ShipmentTracking';


const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const loadOrderData = async () => {
      const state = location.state as any;
      
      console.log('=== ORDER CONFIRMATION DEBUG ===');
      console.log('orderNumber from URL:', orderNumber);
      console.log('location.state:', JSON.stringify(state, null, 2));
      console.log('Has bigshipShipmentId:', !!state?.bigshipShipmentId);
      console.log('Has awbNumber:', !!state?.awbNumber);
      console.log('Has lrnNumber:', !!state?.lrnNumber);
      console.log('================================');
      
      // If we have state, use it
      if (state && state.orderNumber) {
        setOrderData(state);
        
        // If no tracking info, wait and check again (BigShip is processing in background)
        if (!state.bigshipShipmentId && !state.awbNumber) {
        const checkTracking = setInterval(async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/shopify/orders/${state.customer?.email || 'test@test.com'}`);
            const data = await response.json();
            
            if (data.success) {
              const order = data.orders.find((o: any) => o.orderNumber === state.orderNumber);
              if (order && order.awbNumber) {
                setOrderData(order);
                clearInterval(checkTracking);
              }
            }
          } catch (error) {
            console.error('Error checking tracking:', error);
          }
        }, 5000); // Check every 5 seconds
        
        // Stop checking after 2 minutes
        setTimeout(() => clearInterval(checkTracking), 120000);
        
          return () => clearInterval(checkTracking);
        }
      }
      // If no state or doesn't match, fetch from backend using URL parameter
      else if (orderNumber) {
        try {
          // Ensure order number has # prefix for Shopify query
          const searchOrderNumber = orderNumber.startsWith('#') ? orderNumber : `#${orderNumber}`;
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/shopify/orders/${encodeURIComponent(searchOrderNumber)}`);
          const data = await response.json();
          
          if (data.success && data.orders && data.orders.length > 0) {
            // Try to find order with or without # prefix
            const order = data.orders.find((o: any) => 
              o.orderNumber === orderNumber || 
              o.orderNumber === searchOrderNumber ||
              o.orderNumber === `#${orderNumber}` ||
              o.orderNumber.replace('#', '') === orderNumber.replace('#', '')
            );
            if (order) {
              setOrderData(order);
            } else {
              console.log('Order not found, redirecting...');
              console.log('Searched for:', orderNumber, searchOrderNumber);
              console.log('Available orders:', data.orders.map((o: any) => o.orderNumber));
              navigate('/orders');
            }
          } else {
            console.log('Failed to fetch order, redirecting...');
            navigate('/orders');
          }
        } catch (error) {
          console.error('Error fetching order:', error);
          navigate('/orders');
        }
      } else {
        console.log('No state or order ID found, redirecting...');
        navigate('/shop');
      }
    };
    
    loadOrderData();
  }, [location.state, orderNumber, navigate]);
  

  if (!orderData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02FF00] mx-auto mb-4"></div>
          <p className="text-white" style={{ fontFamily: 'DM Sans' }}>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-8 relative overflow-hidden">
      {/* Decorative Ellipse */}
      <img 
        src="/assets/homepage/Ellipse 81.png" 
        alt="" 
        className="absolute -bottom-96 -right-32 md:-right-64 w-[1200px] h-[1200px] pointer-events-none opacity-50"
        style={{ zIndex: 1 }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#02FF00]/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-[#02FF00]" />
          </div>
          <h1 className="text-[48px] leading-[48px] uppercase mb-4" style={{ 
            fontFamily: 'Bebas Neue',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Order Confirmed!</h1>
          <p className="text-white" style={{ fontFamily: 'DM Sans' }}>
            Thank you for your order. We've received your order and will process it shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6 mb-6">
          <h2 className="text-[32px] leading-[32px] uppercase text-white mb-4" style={{ fontFamily: 'Bebas Neue' }}>Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-[#02FF00] uppercase tracking-wide mb-2" style={{ fontFamily: 'DM Sans' }}>
                Order Information
              </h3>
              <div className="space-y-2">
              <div className="flex justify-between">
                  <span className="text-white/70" style={{ fontFamily: 'DM Sans' }}>Order Number:</span>
                  <span className="font-medium text-white" style={{ fontFamily: 'DM Sans' }}>{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70" style={{ fontFamily: 'DM Sans' }}>Order Date:</span>
                  <span className="font-medium text-white" style={{ fontFamily: 'DM Sans' }}>
                    {new Date(orderData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70" style={{ fontFamily: 'DM Sans' }}>Status:</span>
                  <span className="font-medium text-[#02FF00] capitalize" style={{ fontFamily: 'DM Sans' }}>{orderData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70" style={{ fontFamily: 'DM Sans' }}>Total Amount:</span>
                  <span className="font-bold text-lg text-[#02FF00]" style={{ fontFamily: 'DM Sans' }}>₹{orderData.totalAmount}</span>
                </div>
                {orderData.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-white/70" style={{ fontFamily: 'DM Sans' }}>Payment ID:</span>
                    <span className="font-mono text-xs text-white" style={{ fontFamily: 'DM Sans' }}>{orderData.paymentId}</span>
                  </div>
                )}

              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#02FF00] uppercase tracking-wide mb-2" style={{ fontFamily: 'DM Sans' }}>
                What's Next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#02FF00]/20 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-[#02FF00]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white" style={{ fontFamily: 'DM Sans' }}>Order Processing</p>
                    <p className="text-xs text-white/70" style={{ fontFamily: 'DM Sans' }}>We're preparing your items</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#02FF00]/20 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-[#02FF00]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white" style={{ fontFamily: 'DM Sans' }}>Shipping</p>
                    <p className="text-xs text-white/70" style={{ fontFamily: 'DM Sans' }}>Your order will be dispatched soon</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#02FF00]/20 rounded-full flex items-center justify-center">
                    <Home className="w-4 h-4 text-[#02FF00]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white" style={{ fontFamily: 'DM Sans' }}>Delivery</p>
                    <p className="text-xs text-white/70" style={{ fontFamily: 'DM Sans' }}>Expected delivery in 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {orderData.items && orderData.items.length > 0 && (
          <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6 mb-6">
            <h2 className="text-[32px] leading-[32px] uppercase text-white mb-4" style={{ fontFamily: 'Bebas Neue' }}>Order Items</h2>
            
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-white/20 rounded-lg bg-[#393737]">
                  <div className="w-16 h-16 bg-black rounded-lg flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white" style={{ fontFamily: 'DM Sans' }}>{item.title}</h3>
                    <p className="text-sm text-[#02FF00]" style={{ fontFamily: 'DM Sans' }}>Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white" style={{ fontFamily: 'DM Sans' }}>₹{item.price * item.quantity}</p>
                    <p className="text-xs text-white/70" style={{ fontFamily: 'DM Sans' }}>₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Address */}
        {orderData.shippingAddress && (
          <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6 mb-6">
            <h2 className="text-[32px] leading-[32px] uppercase text-white mb-4" style={{ fontFamily: 'Bebas Neue' }}>Shipping Address</h2>
            <div className="text-white space-y-1" style={{ fontFamily: 'DM Sans' }}>
              <p className="font-medium text-[#02FF00]">{orderData.customer?.firstName} {orderData.customer?.lastName}</p>
              <p>{orderData.shippingAddress.address1}</p>
              {orderData.shippingAddress.address2 && <p>{orderData.shippingAddress.address2}</p>}
              <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.province} {orderData.shippingAddress.zip}</p>
              <p>{orderData.shippingAddress.country}</p>
              {orderData.customer?.phone && <p className="mt-2">Phone: {orderData.customer.phone}</p>}
            </div>
          </div>
        )}


        {/* Shipment Tracking */}
        {(orderData.bigshipShipmentId || orderData.awbNumber || orderData.lrnNumber) ? (
          <ShipmentTracking 
            orderId={orderData.bigshipShipmentId || orderData.lrnNumber || orderData.orderNumber}
            awbNumber={orderData.awbNumber}
          />
        ) : (
          <div className="bg-[#393737] border border-[#02FF00]/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Bebas Neue' }}>📦 Tracking Information</h3>
            <p className="text-white text-sm mb-2" style={{ fontFamily: 'DM Sans' }}>
              Your shipment tracking will be available once your order is dispatched.
            </p>
            <p className="text-[#02FF00] text-xs" style={{ fontFamily: 'DM Sans' }}>
              We'll send you an email with tracking details within 24 hours.
            </p>
          </div>
        )}


        {/* Contact Information */}
        <div className="bg-[#393737] border border-[#02FF00]/30 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Bebas Neue' }}>Need Help?</h3>
          <p className="text-white text-sm mb-4" style={{ fontFamily: 'DM Sans' }}>
            If you have any questions about your order, please don't hesitate to contact us.
          </p>
          <div className="space-y-2">
            <p className="text-white text-sm" style={{ fontFamily: 'DM Sans' }}>
              <strong>Email:</strong> <span className="text-[#02FF00]">support@korzi.toys</span>
            </p>
            <p className="text-white text-sm" style={{ fontFamily: 'DM Sans' }}>
              <strong>Order Reference:</strong> <span className="text-[#02FF00]">{orderData.orderNumber}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/orders')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer"
            style={{ width: '200px', height: '46px', fontFamily: 'DM Sans', fontSize: '13px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 uppercase font-medium">View All Orders</span>
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer"
            style={{ width: '200px', height: '46px', fontFamily: 'DM Sans', fontSize: '13px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 uppercase font-medium">Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
