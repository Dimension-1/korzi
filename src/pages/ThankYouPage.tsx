import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || '#23431f';

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Ellipse - Bottom Right */}
      <img 
        src="/assets/homepage/Ellipse 81.png" 
        alt="" 
        className="absolute -bottom-96 -right-64 w-[1200px] h-[1200px] pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <div className="max-w-3xl w-full text-center bg-[#1a1a1a] px-16 py-20 relative z-10">
        {/* Dragonfly Icon */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/assets/party.png" 
            alt="Success" 
            className="w-16 h-16"
          />
        </div>

        {/* Heading */}
        <h1 className="text-[48px] leading-[48px] uppercase mb-8" style={{ 
          fontFamily: 'Bebas Neue',
          background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          THANKYOU FOR YOUR ORDER!
        </h1>

        {/* Divider */}
        <div className="w-full max-w-md mx-auto border-t border-white/30 mb-8"></div>

        {/* Order Details */}
        <p className="text-white text-[16px] leading-[24px] mb-2">
          Thanks for placing your order <span className="text-[#02FF00]">{orderId}</span>
        </p>
        <p className="text-white text-[16px] leading-[24px] mb-12">
          We will send you an update when the order is shipped.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={() => navigate('/product-description')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer" 
            style={{ width: '200px', height: '46px' }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <ChevronLeft className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[13px] leading-[16px] uppercase font-medium">
              BACK TO SHOPPING
            </span>
          </button>

          <span className="text-white text-[16px] uppercase">OR</span>

          <button 
            onClick={() => navigate('/order-confirmation')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer" 
            style={{ width: '200px', height: '46px' }}
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
