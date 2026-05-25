import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, CreditCard } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { getCloudinaryUrl } from '../utils/cloudinary';


const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orderHistory, fetchOrderHistory, isLoading } = useOrderStore();
  const { customer } = useAuthStore();

  useEffect(() => {
    if (customer?.email) {
      fetchOrderHistory(customer.email);
    }
  }, [customer?.email, fetchOrderHistory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02FF00] mx-auto mb-4"></div>
          <p className="text-white" style={{ fontFamily: 'DM Sans' }}>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-8 relative overflow-hidden">
      {/* Decorative Ellipse */}
      <img 
        src={getCloudinaryUrl('/assets/homepage/Ellipse 81.png')} 
        alt="" 
        className="absolute -bottom-96 -right-32 md:-right-64 w-[1200px] h-[1200px] pointer-events-none opacity-50"
        style={{ zIndex: 1 }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[3px] border-[#02FF00] group relative overflow-hidden cursor-pointer mb-6"
            style={{ width: '120px', height: '46px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <ArrowLeft className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[13px] leading-[16px] uppercase font-medium">Back</span>
          </button>
          <h1 className="text-[48px] leading-[48px] uppercase" style={{ 
            fontFamily: 'Bebas Neue',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Order History</h1>
        </div>

        {orderHistory.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-[#02FF00]/20 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-[#02FF00]" />
            </div>
            <h2 className="text-[32px] leading-[32px] uppercase mb-4" style={{ 
              fontFamily: 'Bebas Neue',
              background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>No orders yet</h2>
            <p className="text-white mb-6" style={{ fontFamily: 'DM Sans' }}>
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer mx-auto"
              style={{ width: '200px', height: '46px', fontFamily: 'DM Sans', fontSize: '13px' }}
            >
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 uppercase font-medium">Start Shopping</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-[#1a1a1a] border border-white/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#02FF00]/20 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#02FF00]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Bebas Neue' }}>
                        Order {order.orderNumber}
                      </h3>
                      <p className="text-sm text-white/70" style={{ fontFamily: 'DM Sans' }}>
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-[#02FF00]" style={{ fontFamily: 'DM Sans' }}>₹{order.totalAmount}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#02FF00]/20 text-[#02FF00]" style={{ fontFamily: 'DM Sans' }}>
                      Paid
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-sm font-medium text-[#02FF00] mb-3 uppercase" style={{ fontFamily: 'DM Sans' }}>Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-black rounded flex-shrink-0">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover rounded"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white" style={{ fontFamily: 'DM Sans' }}>{item.title}</p>
                            <p className="text-white/70" style={{ fontFamily: 'DM Sans' }}>Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-white" style={{ fontFamily: 'DM Sans' }}>₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-white/70" style={{ fontFamily: 'DM Sans' }}>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-[#02FF00]" />
                        <span>Ordered</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="w-4 h-4 text-[#02FF00]" />
                        <span>Paid</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/order-confirmation/${order.orderNumber.replace('#', '')}`, { state: order })}
                      className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[3px] border-[#02FF00] group relative overflow-hidden cursor-pointer"
                      style={{ width: '140px', height: '38px', fontFamily: 'DM Sans', fontSize: '12px' }}
                    >
                      <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                      <span className="relative z-10 group-hover:text-black transition-colors duration-300 uppercase font-medium">View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
