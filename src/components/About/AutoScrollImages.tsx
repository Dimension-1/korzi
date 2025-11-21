import { useEffect, useRef, useState } from 'react';

export default function AutoScrollImages() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    '/assets/About/AutoScroll/AutoScroll1.png',
    '/assets/About/AutoScroll/AutoScroll2.png',
    '/assets/About/AutoScroll/AutoScroll3.png',
    '/assets/About/AutoScroll/AutoScroll4.png',
    '/assets/About/AutoScroll/AutoScroll5.png',
    '/assets/About/AutoScroll/AutoScroll6.png',
    '/assets/About/AutoScroll/AutoScroll7.png'
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      const scrollAmount = nextIndex * (container.offsetWidth / 3);
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  return (
    <section className="bg-black py-16 px-4 md:px-8">
      <div className="w-full mx-auto">
        {/* Scrolling Images */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, idx) => (
            <div key={idx} className="flex-shrink-0 w-[calc(33.333%-11px)]">
              <img 
                src={image} 
                alt={`Korzi ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex gap-2 justify-center mt-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const scrollAmount = idx * (scrollContainerRef.current.offsetWidth / 3);
                  scrollContainerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                  setActiveIndex(idx);
                }
              }}
              className={`h-1 transition-all ${
                idx === activeIndex ? 'w-8 bg-[#02FF00]' : 'w-8 bg-zinc-800 border border-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
