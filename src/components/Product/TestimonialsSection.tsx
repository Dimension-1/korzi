import { useState, useRef, useEffect } from 'react';
import { getReviews, Review } from '../../services/hygraph';

const ratingBreakdown = [
  { stars: 5, count: 198 },
  { stars: 4, count: 50 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 }
];

const totalReviews = 248;
const averageRating = '4.8';

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviews();
      setTestimonials(reviews);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      
      // If at the end, show last indicator
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setActiveIndex(5);
        return;
      }
      
      const cardWidth = window.innerWidth < 768 ? 280 + 12 : 329 + 16;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), 5));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = window.innerWidth < 768 ? 280 + 12 : 329 + 16;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const scrollPercentage = x / rect.width;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    container.scrollLeft = scrollPercentage * maxScroll;
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? 'text-[#02FF00]' : 'text-zinc-700'}>★</span>
    ));
  };



  return (
    <section className="bg-black py-8 md:py-16 relative min-h-[500px] md:min-h-[600px]" style={{ overflow: 'visible' }}>
      {/* Background gradient ellipse - Desktop */}
      <div className="absolute -left-40 top-0 w-1/2 h-[180%] pointer-events-none z-10 hidden md:block">
        <img src="/assets/homepage/Ellipse80.png" alt="" className="w-full h-full object-contain opacity-100" />
      </div>

      {/* Background gradient ellipse - Mobile */}
      <div className="absolute -right-10 -top-30 w-46/7 h-full pointer-events-none z-10 md:hidden">
        <img src="/assets/homepage/Ellipse 81.png" alt="" className="w-full h-full object-contain opacity-100" />
      </div>
      
      <div className="w-full mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 md:gap-12">
          {/* Left: Rating Summary */}
          <div className="text-center lg:text-left">
            <h2 
              className="uppercase mb-6 md:mb-8 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Bebas Neue'
              }}
            >
              TESTIMONIALS
            </h2>

            <div className="mb-6 md:mb-8 flex flex-col items-center lg:items-start">
              <div className="flex items-baseline gap-2 mb-2">
                <span 
                  className="text-[#02FF00] text-5xl md:text-6xl"
                  style={{ fontFamily: 'Bebas Neue' }}
                >
                  {averageRating}
                </span>
                <span 
                  className="text-white text-2xl md:text-3xl"
                  style={{ fontFamily: 'Bebas Neue' }}
                >
                  /5
                </span>
              </div>
              <p className="text-white text-sm mb-1" style={{ fontFamily: 'DM Sans' }}>
                Overall Rating
              </p>
              <p className="text-zinc-500 text-xs" style={{ fontFamily: 'DM Sans' }}>
                {totalReviews} Verified Ratings
              </p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2 max-w-xs mx-auto lg:mx-0">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-white text-sm w-3">{item.stars}</span>
                  <div className="flex-1 h-2 bg-zinc-800 relative overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-[#02FF00]"
                      style={{ width: `${totalReviews > 0 ? (item.count / totalReviews) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-zinc-500 text-xs w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Testimonial Cards */}
          <div className="overflow-hidden pr-4">
            <div 
              ref={scrollContainerRef}
              onMouseMove={handleMouseMove}
              className="flex gap-3 md:gap-4 overflow-x-auto pb-6 cursor-pointer"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'none'
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="p-4 md:p-6 relative flex-shrink-0 w-[280px] md:w-[329px] h-[480px] md:h-[520px] snap-start"
                  style={{
                    background: '#0F0F0F',
                    border: '1px solid #5E5E5E',
                    boxSizing: 'border-box'
                  }}
                >
                  <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-6">
                    {/* Avatar */}
                    {testimonial.image?.url ? (
                      <img 
                        src={testimonial.image.url} 
                        alt={testimonial.name}
                        className="w-12 md:w-14 h-12 md:h-14 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#02FF00] flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-xl">A</span>
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm md:text-base" style={{ fontFamily: 'DM Sans' }}>
                        {testimonial.name}
                      </p>
                      <p className="text-zinc-500 text-xs md:text-sm" style={{ fontFamily: 'DM Sans' }}>
                        Verified Buyer
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3 md:mb-4 text-sm md:text-base">
                    {renderStars(testimonial.rating)}
                  </div>

                  <h4 className="text-white font-semibold text-sm md:text-base mb-2 md:mb-3" style={{ fontFamily: 'DM Sans' }}>
                    {testimonial.title}
                  </h4>

                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
                    {testimonial.review}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicators */}
            <div className="flex gap-2 justify-center mt-4">
              {testimonials.slice(0, 6).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-1.5 transition-all ${
                    idx === activeIndex ? 'w-8 md:w-10 bg-[#02FF00]' : 'w-8 md:w-10 bg-transparent border border-[#02FF00]'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
