import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

const ShopFooter: React.FC = () => {
  const [, setIsScrolling] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  const { openDrawer } = useCartStore();

  const handleAddToCart = () => {
    console.log('Opening cart drawer');
    openDrawer();
  };


  useEffect(() => {
    let scrollTimer: number;
    const handleScroll = () => {
      setIsScrolling(true);
      setShowWhatsApp(false);
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
        setShowWhatsApp(true);
      }, 1000);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--primary)] z-50">
      {/* Top Section - Light Background */}
      <div className="bg-[var(--background)] px-2 sm:px-4 py-2 sm:py-3">
        <div className="mx-auto flex items-center justify-between relative">
          {/* Points Button */}
           <button className="bg-[var(--primary)] text-[var(--background)] px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 font-semibold hover:bg-[var(--secondary)] transition-colors duration-200 absolute -top-6 sm:-top-6 left-0 sm:left-4 text-xs sm:text-sm">
            <Gift className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">0 Points</span>
            <span className="sm:hidden">0</span>
          </button>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-[var(--primary)] text-[var(--background)] py-2 sm:py-3 px-4 sm:px-8 rounded-lg font-bold text-sm sm:text-lg hover:bg-[var(--secondary)] transition-colors duration-200 shadow-lg mx-auto w-[60%] sm:w-[50%]" 
          >
            <span className="hidden sm:inline">ADD TO CART</span>
            <span className="sm:hidden">ADD</span>
          </button>
          
          {/* WhatsApp Support */}
          <img 
            src="/whatsapp-svgrepo-com.svg" 
            alt="WhatsApp" 
            className={`bg-green-500 rounded-full p-1 sm:p-2 w-8 h-8 sm:w-12 sm:h-12 transition-all duration-300 absolute -top-6 right-0 sm:right-4 ${
              showWhatsApp ? 'opacity-100 transform scale-100' : 'opacity-0 transform pointer-events-none'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopFooter;
