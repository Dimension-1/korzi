import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, CreditCard } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orderHistory } = useOrderStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        </div>

        {orderHistory.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">₹{order.totalAmount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover rounded"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Ordered</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="w-4 h-4" />
                        <span>Paid</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Details
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
