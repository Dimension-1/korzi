// src/components/Home/CarAnimation.tsx
import { useEffect, useRef, useState } from 'react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function CarAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start animation only when section is fully in view
      const scrollStart = rect.top - windowHeight * 0.5;
      const scrollEnd = rect.top + windowHeight * 0.3;
      const scrollRange = scrollEnd - scrollStart;
      const currentScroll = -scrollStart;
      
      const progress = Math.max(0, Math.min(1, currentScroll / scrollRange));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Car animation positions
  const startPosition = 80; // 60% visible from right
  const endPosition = -10;  // Half visible from left
  const carPosition = startPosition + (scrollProgress * (endPosition - startPosition));

  return (
    <section ref={sectionRef} className="bg-black overflow-hidden min-h-[200px] md:min-h-[400px]" style={{ height: window.innerWidth < 768 ? '35vh' : '50vh' }}>
      <div className="sticky top-0 h-32 md:h-96 flex items-start pt-2 md:pt-8">
        <div className="w-full relative h-32 md:h-64">
          {/* Right tire marks - reveal from right to left */}
          <img 
            src={getCloudinaryUrl('/assets/homepage/tyremarks.png')}
            alt="right tire marks"
            loading="lazy"
            className="absolute h-auto"
            style={{ 
              top: window.innerWidth < 768 ? '137px' : '274px',
              left: window.innerWidth < 768 ? '50px' : '0px',
              width: '4000px',
              height: window.innerWidth < 768 ? '30px' : '60px',
              opacity: scrollProgress > 0 ? 1 : 0,
              clipPath: `inset(0 0 0 ${95 - (scrollProgress * 100)}%)`,
              zIndex: 20
            }}
          />

          {/* Left tire marks - reveal from right to left */}
          <img 
            src={getCloudinaryUrl('/assets/homepage/tyremarks.png')}
            alt="left tire marks"
            loading="lazy"
            className="absolute h-auto"
            style={{ 
              top: window.innerWidth < 768 ? '25px' : '50px',
              left: window.innerWidth < 768 ? '50px' : '0px',
              width: '4000px',
              height: window.innerWidth < 768 ? '30px' : '60px',
              opacity: scrollProgress > 0 ? 1 : 0,
              clipPath: `inset(0 0 0 ${95 - (scrollProgress * 100)}%)`,
              zIndex: 20
            }}
          />

          {/* Car - moves right to left */}
          <img 
            src={`${getCloudinaryUrl('/assets/homepage/Car_3.png')}?v=2`}
            alt="car"
            loading="lazy"
            className="absolute h-auto"
            style={{ 
              top: window.innerWidth < 768 ? '5px' : '10px',
              left: `${carPosition}%`,
              width: window.innerWidth < 768 ? '310px' : '620px',
              zIndex: 30
            }}
          />
        </div>
      </div>
    </section>
  );
}
