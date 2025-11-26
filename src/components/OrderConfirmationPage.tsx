import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import ShipmentTracking from './ShipmentTracking';


const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const state = location.state as any;
    console.log('=== ORDER CONFIRMATION DEBUG ===');
    console.log('location.state:', state);
    console.log('================================');
    
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
    } else {
      console.log('No state found, redirecting...');
      navigate('/shop');
    }
  }, [location.state, navigate]);
  

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your order and will process it shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Order Information
              </h3>
              <div className="space-y-2">
              <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium text-gray-900">{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(orderData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600 capitalize">{orderData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg text-gray-900">₹{orderData.totalAmount}</span>
                </div>
                {orderData.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-mono text-xs text-gray-900">{orderData.paymentId}</span>
                  </div>
                )}

              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                What's Next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order Processing</p>
                    <p className="text-xs text-gray-500">We're preparing your items</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                    <p className="text-xs text-gray-500">Your order will be dispatched soon</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Home className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delivery</p>
                    <p className="text-xs text-gray-500">Expected delivery in 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {orderData.items && orderData.items.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
            
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{item.price * item.quantity}</p>
                    <p className="text-xs text-gray-500">₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Address */}
        {orderData.shippingAddress && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="text-gray-700 space-y-1">
              <p className="font-medium">{orderData.customer?.firstName} {orderData.customer?.lastName}</p>
              <p>{orderData.shippingAddress.address1}</p>
              {orderData.shippingAddress.address2 && <p>{orderData.shippingAddress.address2}</p>}
              <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.province} {orderData.shippingAddress.zip}</p>
              <p>{orderData.shippingAddress.country}</p>
              {orderData.customer?.phone && <p className="mt-2">Phone: {orderData.customer.phone}</p>}
            </div>
          </div>
        )}


        {/* Shipment Tracking */}
          {orderData.bigshipShipmentId && (
            <ShipmentTracking 
              orderId={orderData.orderNumber}
              awbNumber={orderData.awbNumber}
            />
        )}


        {/* Contact Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 text-sm mb-4">
            If you have any questions about your order, please don't hesitate to contact us.
          </p>
          <div className="space-y-2">
            <p className="text-blue-700 text-sm">
              <strong>Email:</strong> support@korzi.toys
            </p>
            <p className="text-blue-700 text-sm">
              <strong>Order Reference:</strong> {orderData.orderNumber}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
