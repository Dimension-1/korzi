import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Info } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full sm:w-[95%] lg:w-[97%] h-full bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden">
      {/* Title */}
      {title && (
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-[var(--primary)] font-bold text-lg uppercase tracking-wide">
            {title}
          </h3>
        </div>
      )}

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`${title || 'Product'} ${currentIndex + 1}`}
        className="w-full h-full object-fit"
      />

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[var(--primary)] rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[var(--primary)] rounded-full transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-[var(--primary)]/80 text-[var(--background)] px-2 py-1 rounded text-sm font-semibold">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

interface ProductSectionProps {
  className?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  className = '' 
}) => {

  // Sample images for right carousel
  const rightImages = [
    'https://images.unsplash.com/photo-1562140178-4c4b4b4b4b4b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop'
  ];

  return (
    <div className={`py-16 bg-[var(--background)] ${className}`}>
      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* Left Product Details - 50% width */}
        <div className="md:w-1/2 w-full md:h-[90vh] h-auto overflow-y-auto flex-shrink-0 px-6 py-8 bg-[var(--background)]">
          {/* NEW LAUNCH Banner */}
          <div className="mb-4">
            <span className="bg-[var(--primary)] text-[var(--background)] px-3 py-1 rounded-full text-xs font-bold uppercase">
              NEW LAUNCH
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl font-bold text-[var(--primary)] uppercase mb-4 leading-tight">
            COLD COFFEE 1 KG - FERMENTED YEAST PROTEIN
          </h1>

          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-[var(--foreground)]">Rs. 2,699</span>
              <span className="text-lg text-[var(--text-secondary)] line-through">Rs. 2,899</span>
              <span className="text-sm text-[var(--secondary)] font-semibold">-7% OFF</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">Incl. of all taxes & shipping</p>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--primary)] text-[var(--primary)]" />
              ))}
              <Star className="w-4 h-4 text-[var(--text-secondary)]" />
            </div>
            <span className="text-[var(--text-secondary)] text-sm">| 80 Reviews</span>
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <p className="text-[var(--foreground)] leading-relaxed">
              Love your brew? This one's for you. A cold coffee flavour that actually tastes like a frothy coffee with <strong>no</strong> artificial aftertaste. Perfect for coffee lovers who want protein without compromising on taste.
            </p>
            <button className="text-[var(--primary)] underline text-sm mt-2 hover:text-[var(--secondary)] transition-colors">
              Read more
            </button>
          </div>

          {/* Earn Points Banner */}
          <div className="bg-[var(--primary)] rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[var(--background)]" />
              <span className="text-[var(--background)] font-semibold">Earn upto 269 Points on this purchase</span>
            </div>
            <Info className="w-4 h-4 text-[var(--background)]" />
          </div>

          {/* Key Features */}
          <div className="flex items-center justify-between border-t border-[var(--border)] pt-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--background)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--background)] text-xs font-bold">24</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)]">24g Protein</p>
            </div>
            
            <div className="w-px h-16 bg-[var(--border)]"></div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--background)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--background)] text-xs font-bold">5</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)]">5g BCAA</p>
            </div>
            
            <div className="w-px h-16 bg-[var(--border)]"></div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--background)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--background)] text-xs font-bold">9</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)]">ALL 9 EAAs</p>
            </div>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-[var(--primary)] rounded-lg p-4 mb-4">
            <p className="text-[var(--background)] font-bold text-center uppercase tracking-wide">
              FREE SHIPPING + 3% PREPAID BONUS
            </p>
          </div>

          {/* Payment Methods */}
          <div className="border border-[var(--border)] rounded-lg p-4 mb-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">BHIM</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] hidden sm:inline">BHIM</span>
              </div>
              
              <div className="w-px h-4 sm:h-6 bg-[var(--border)] hidden sm:block"></div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">G</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] hidden sm:inline">G Pay</span>
              </div>
              
              <div className="w-px h-4 sm:h-6 bg-[var(--border)] hidden sm:block"></div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">पे</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] hidden sm:inline">PhonePe</span>
              </div>
              
              <div className="w-px h-4 sm:h-6 bg-[var(--border)] hidden sm:block"></div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">P</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] hidden sm:inline">Paytm</span>
              </div>
              
              <div className="w-px h-4 sm:h-6 bg-[var(--border)] hidden sm:block"></div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">V</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] hidden sm:inline">VISA</span>
              </div>
            </div>
          </div>

          {/* Product Information Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 border-t border-[var(--border)] pt-4">
            <button className="text-[var(--foreground)] font-bold uppercase text-xs sm:text-sm underline hover:text-[var(--primary)] transition-colors">
              NUTRITIONAL FACTS
            </button>
            
            <div className="w-px h-3 sm:h-4 bg-[var(--border)] hidden sm:block"></div>
            
            <button className="text-[var(--foreground)] font-bold uppercase text-xs sm:text-sm underline hover:text-[var(--primary)] transition-colors">
              ALLERGEN
            </button>
            
            <div className="w-px h-3 sm:h-4 bg-[var(--border)] hidden sm:block"></div>
            
            <button className="text-[var(--foreground)] font-bold uppercase text-xs sm:text-sm underline hover:text-[var(--primary)] transition-colors">
              INGREDIENTS
            </button>
            
            <div className="w-px h-3 sm:h-4 bg-[var(--border)] hidden sm:block"></div>
            
            <button className="text-[var(--foreground)] font-bold uppercase text-xs sm:text-sm underline hover:text-[var(--primary)] transition-colors">
              QUALITY REPORT
            </button>
          </div>
        </div>
        
        {/* Right Image Carousel - 50% width */}
        <div className="md:w-1/2 mx-auto w-[90%] h-[80vh] md:h-[90vh] flex-shrink-0">
          <ImageCarousel images={rightImages} title="Product Details" />
        </div>
      </div>
    </div>
  );
};

export default ProductSection;