import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { getCloudinaryUrl } from '../utils/cloudinary';


export default function ThankYouPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  
  console.log('=== THANK YOU PAGE DEBUG ===');
  console.log('orderId from URL:', orderId);
  console.log('Full URL:', window.location.href);
  console.log('===========================');
  const { orderHistory, fetchOrderHistory } = useOrderStore();
  const { customer } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      // First check local order history
      let order = orderHistory.find(o => o.orderNumber === orderId || o.id === orderId);
      
      // If not found and customer is logged in, fetch from Shopify
      if (!order && customer?.email) {
        await fetchOrderHistory(customer.email);
      }
      
      setIsLoading(false);
    };
    
    loadOrder();
  }, [orderId, customer?.email, fetchOrderHistory]);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#02FF00] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Ellipse - Bottom Right */}
      <img 
        src="/assets/homepage/Ellipse 81.png" 
        alt="" 
        className="absolute -bottom-96 -right-32 md:-right-64 w-[1200px] h-[1200px] pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <div className="max-w-3xl w-full text-center bg-[#1a1a1a] px-6 md:px-16 py-12 md:py-20 relative z-10">
        {/* Dragonfly Icon */}
        <div className="mb-6 md:mb-8 flex justify-center">
          <img 
            src={getCloudinaryUrl('/assets/party.png')} 
            alt="Success" 
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </div>

        {/* Heading */}
        <h1 className="text-[32px] md:text-[48px] leading-[36px] md:leading-[48px] uppercase mb-6 md:mb-8 px-4" style={{ 
          fontFamily: 'Bebas Neue',
          background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          THANKYOU FOR YOUR ORDER!
        </h1>

        {/* Divider */}
        <div className="w-full max-w-md mx-auto border-t border-white/30 mb-6 md:mb-8"></div>

        {/* Order Details */}
        <p className="text-white text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] mb-2 px-4">
          Thanks for placing your order {orderId && <span className="text-[#02FF00]">{orderId}</span>}
        </p>
        <p className="text-white text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] mb-8 md:mb-12 px-4">
          We will send you an update when the order is shipped.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <button 
            onClick={() => navigate('/shop')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer w-full md:w-[200px]" 
            style={{ height: '46px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <ChevronLeft className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[13px] leading-[16px] uppercase font-medium">
              BACK TO SHOPPING
            </span>
          </button>

          <span className="text-white text-[14px] md:text-[16px] uppercase">or</span>

          <button 
            onClick={() => {
              console.log('Navigating to order confirmation with orderId:', orderId);
              if (orderId) {
                navigate(`/order-confirmation/${orderId.replace('#', '')}`);
              } else {
                console.error('No orderId available!');
                alert('Order ID not found. Please try again.');
              }
            }}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer w-full md:w-[200px]" 
            style={{ height: '46px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[13px] leading-[16px] uppercase font-medium">
              VIEW YOUR ORDER
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
