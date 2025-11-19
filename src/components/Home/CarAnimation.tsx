// src/components/Home/CarAnimation.tsx
import { useEffect, useRef, useState } from 'react';

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
    <section ref={sectionRef} className="bg-black overflow-hidden" style={{ height: '50vh' }}>
      <div className="sticky top-0 h-96 flex items-start pt-8">
        <div className="w-full relative h-64">
          {/* Right tire marks - reveal from right to left */}
          <img 
            src="/assets/homepage/tyremarks.png"
            alt="right tire marks"
            className="absolute h-auto"
            style={{ 
              top: '274px',
              width: '4000px',
              height:'60px',
              opacity: scrollProgress > 0 ? 1 : 0,
              clipPath: `inset(0 0 0 ${95 - (scrollProgress * 100)}%)`,
              zIndex: 20
            }}
          />

          {/* Left tire marks - reveal from right to left */}
          <img 
            src="/assets/homepage/tyremarks.png"
            alt="left tire marks"
            className="absolute h-auto"
            style={{ 
              top: '50px',
              width: '4000px',
              height: '60px',
              opacity: scrollProgress > 0 ? 1 : 0,
              clipPath: `inset(0 0 0 ${95 - (scrollProgress * 100)}%)`,
              zIndex: 20
            }}
          />

          {/* Car - moves right to left */}
          <img 
            src="/assets/homepage/Car_3.png"
            alt="car"
            className="absolute h-auto"
            style={{ 
              top: '10px',
              left: `${carPosition}%`,
              width: '600px',
              zIndex: 30
            }}
          />
        </div>
      </div>
    </section>
  );
}
