import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  variantId?: string;
  points?: number;
  showWhatsApp?: boolean;
}

interface ProductCarouselProps {
  title?: string;
  products: Product[];
  itemsPerView?: number;
}

export default function ProductCarousel({ 
  title = "OUR PRODUCTS", 
  products, 
  itemsPerView = 4 
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const scrollToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
    
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320; // w-80 = 320px
      const gap = 16; // gap-4 = 16px
      const scrollLeft = clampedIndex * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(currentIndex + 1);
  };


  if (products.length === 0) {
    return (
      <div className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">{title}</h2>
            <p className="text-[var(--text-secondary)]">No products available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-1 px-2 md:px-4 lg:px-8 bg-[var(--background)]">
      <div className=" mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">{title}</h2>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-2 rounded-full bg-[var(--secondary)] text-[var(--background)] hover:bg-[var(--primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-hidden"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-80">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
