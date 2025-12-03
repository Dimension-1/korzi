import { useState, useRef, useEffect } from 'react';


const allTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    verified: true,
    rating: 5,
    title: "Amazing product!",
    review: "Exceeded my expectations. Highly recommend to everyone.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Mike Chen",
    verified: true,
    rating: 4,
    title: "Great quality",
    review: "Great quality and fast shipping. Will definitely order again.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Emily Davis",
    verified: true,
    rating: 5,
    title: "Perfect!",
    review: "Exactly what I was looking for. Customer service was excellent too.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "David Wilson",
    verified: true,
    rating: 3,
    title: "Good product",
    review: "Good product overall, but could be better."
  },
  {
    id: 5,
    name: "Lisa Brown",
    verified: true,
    rating: 5,
    title: "Outstanding quality",
    review: "Outstanding quality and value for money. Very satisfied with my purchase.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop"
  },
  {
    id: 6,
    name: "Alex Rodriguez",
    verified: true,
    rating: 4,
    title: "Fast delivery",
    review: "Fast delivery and good packaging. Product works as described."
  },
  {
    id: 7,
    name: "Maria Garcia",
    verified: true,
    rating: 5,
    title: "Love it!",
    review: "Will definitely buy again. Great customer service.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=200&fit=crop"
  },
  {
    id: 8,
    name: "John Smith",
    verified: true,
    rating: 4,
    title: "Good product",
    review: "Meets expectations. Would recommend to friends."
  },
  {
    id: 9,
    name: "Anna Taylor",
    verified: true,
    rating: 5,
    title: "Excellent quality!",
    review: "Better than I expected. Will order more soon.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=200&fit=crop"
  }
];

// Calculate rating breakdown from all testimonials
const calculateRatingBreakdown = () => {
  const breakdown = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: allTestimonials.filter(t => t.rating === stars).length
  }));
  return breakdown;
};

const ratingBreakdown = calculateRatingBreakdown();
const totalReviews = allTestimonials.length;
const averageRating = (allTestimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews).toFixed(1);

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <section className="bg-black py-8 md:py-16 relative">
      {/* Background ellipse extending from Built in India section */}
      <div className="absolute -right-32 -top-96 w-1/2 h-[200%] pointer-events-none z-0 hidden md:block">
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
          <div className="overflow-hidden">
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
              {allTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="p-4 md:p-6 relative flex-shrink-0 w-[280px] md:w-[329px] h-[350px] md:h-[392px] snap-start"
                  style={{
                    background: '#0F0F0F',
                    border: '1px solid #5E5E5E',
                    boxSizing: 'border-box'
                  }}
                >
                  <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-6">
                    {/* Avatar */}
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
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
              {allTestimonials.slice(0, 6).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-1 transition-all ${
                    idx === activeIndex ? 'w-8 bg-[#02FF00]' : 'w-8 bg-zinc-800 border border-zinc-700'
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
