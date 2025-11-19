import { useState } from 'react';

export default function SpecsSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    const specs = [
      {
        image: '/assets/homepage/kmh.png',
        width: '227px',
        height: '252px',
        rotation: -3.47,
        left: 0,
      },
      {
        image: '/assets/homepage/scale.png',
        width: '227px',
        height: '252px',
        rotation: 4.96,
        left: 180,
      },
      {
        image: '/assets/homepage/Ghz.png',
        width: '227px',
        height: '252px',
        rotation: -3.3,
        left: 360,
      },
      {
        image: '/assets/homepage/control.png',
        width: '239.49px',
        height: '263.19px',
        rotation: 3.5,
        left: 540,
      },
      {
        image: '/assets/homepage/range.png',
        width: '227px',
        height: '252px',
        rotation: -2.8,
        left: 730,
      },
    ];
  
    return (
      <section className="bg-black py-16 md:py-0 overflow-hidden">
        <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-4">
          <div className="relative h-[400px] flex justify-center items-center">
            <div className="relative" style={{ width: '950px', height: '300px' }}>
              {specs.map((spec, index) => (
                <img
                  key={index}
                  src={spec.image}
                  alt={`Spec ${index + 1}`}
                  style={{
                    position: 'absolute',
                    width: spec.width,
                    height: spec.height,
                    left: `${spec.left}px`,
                    transform: hoveredIndex === index 
                      ? `rotate(${spec.rotation}deg) scale(1.1) translateY(-10px)` 
                      : `rotate(${spec.rotation}deg)`,
                    zIndex: hoveredIndex === index ? 50 : index,
                    transition: 'all 0.3s ease',
                    filter: hoveredIndex === index ? 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.5))' : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                  }}
                  className="object-contain cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  