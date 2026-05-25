import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Frown } from 'lucide-react';
import { getCloudinaryUrl } from '../utils/cloudinary';


export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Ellipse - Bottom Right */}
      <img 
        src={getCloudinaryUrl('/assets/homepage/Ellipse 81.png')} 
        alt="" 
        className="absolute -bottom-96 -right-32 md:-right-64 w-[1200px] h-[1200px] pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <div className="max-w-3xl w-full text-center bg-[#1a1a1a] px-6 md:px-16 py-12 md:py-20 relative z-10">
        {/* Sad Face Icon */}
        <div className="mb-6 md:mb-8 flex justify-center">
          <Frown className="w-12 h-12 md:w-16 md:h-16 text-[#02FF00]" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h1 className="text-[32px] md:text-[48px] leading-[36px] md:leading-[48px] uppercase mb-6 md:mb-8 px-4" style={{ 
          fontFamily: 'Bebas Neue',
          background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          OOPS! CREW IS ON IT.
        </h1>

        {/* Divider */}
        <div className="w-full max-w-md mx-auto border-t border-white/30 mb-6 md:mb-8"></div>

        {/* Error Details */}
        <p className="text-white text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] mb-2 px-4">
          The page you are looking for is not available.
        </p>
        <p className="text-white text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] mb-8 md:mb-12 px-4">
          An unexpected error occurred.
        </p>

        {/* Button */}
        <div className="flex justify-center">
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
        </div>
      </div>
    </div>
  );
}
