import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function VideoCarouselSection() {
  const videos = Array(9).fill('/assets/homepage/KORZI WEBSITE HEROBANNER VIDEO.mp4');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const scrollPercentage = x / rect.width;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    container.scrollLeft = scrollPercentage * maxScroll;
  };

  return (
    <section className="bg-black py-16">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-8">
        {/* Title */}
        <h2 
          className="text-center uppercase mb-12 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '64px',
            lineHeight: '64px',
          }}
        >
          WATCH KORZI TAKE OVER
        </h2>

        {/* Video Carousel with Hover Scroll */}
        <div 
          ref={scrollContainerRef}
          onMouseMove={handleMouseMove}
          className="flex gap-4 overflow-x-hidden mb-8 pb-4 cursor-pointer scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video, index) => (
            <div key={index} className="flex-shrink-0 w-[180px] h-[320px] bg-gray-800 relative">
              <video 
                src={video}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            </div>
          ))}
        </div>

        {/* Shop Now Button */}
        <div className="flex justify-center mb-20">
          <button className="bg-[#3A3A3A] text-white px-8 py-3 flex items-center gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden">
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', fontSize: '14px', letterSpacing: '0.05em' }}>
              SHOP NOW
            </span>
            <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
