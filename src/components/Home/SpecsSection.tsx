import { useState } from 'react';
import { getCloudinaryUrl } from '../../utils/cloudinary';

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
          {/* Desktop Layout - Unchanged */}
          <div className="hidden md:flex relative h-[400px] justify-center items-center">
            <div className="relative" style={{ width: '950px', height: '300px' }}>
              {specs.map((spec, index) => (
                <img
                  key={index}
                  src={getCloudinaryUrl(spec.image)}
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

          {/* Mobile Layout - Fixed & Centered */}
        <div className="md:hidden flex justify-center w-full">
          {/* Using a 340px container to pull everything into a tighter cluster */}
          <div className="relative flex-shrink-0" style={{ width: '340px', height: '280px' }}>
            
            {/* 1. 1:16 SCALE (Top Center) - Layered at the back */}
            <img
              src={getCloudinaryUrl(specs[1].image)}
              alt="1:16 Scale"
              style={{
                position: 'absolute',
                width: '124.5px',
                height: '138.21px',
                left: '108px',  // Moved left to tighten the gap
                top: '0px',
                transform: 'rotate(4.96deg)',
                zIndex: 10,
              }}
              className="object-contain"
            />

            {/* 2. 25 KM/H (Top Left) - Overlaps the Scale card */}
            <img
              src={getCloudinaryUrl(specs[0].image)}
              alt="25 KM/H"
              style={{
                position: 'absolute',
                width: '124.5px',
                height: '138.21px',
                left: '5px',    // Pulled in closer
                top: '12px',
                transform: 'rotate(-3.47deg)',
                zIndex: 20,
              }}
              className="object-contain"
            />

            {/* 3. 2.4Ghz (Top Right) - Overlaps the Scale card */}
            <img
              src={getCloudinaryUrl(specs[2].image)}
              alt="2.4Ghz"
              style={{
                position: 'absolute',
                width: '124.5px',
                height: '138.21px',
                left: '210px',  // Pulled in significantly to remove the right-side gap
                top: '25px',
                transform: 'rotate(-3.3deg)',
                zIndex: 20,
              }}
              className="object-contain"
            />

            {/* 4. 4x4 CONTROL (Bottom Left) - Tucked behind Range */}
            <img
              src={getCloudinaryUrl(specs[3].image)}
              alt="4x4 Control"
              style={{
                position: 'absolute',
                width: '131.34px',
                height: '144.34px',
                left: '55px',   // Shifted right slightly to overlap top row
                top: '105px',   // Moved up to close vertical gap
                transform: 'rotate(3.5deg)',
                zIndex: 15,
              }}
              className="object-contain"
            />

            {/* 5. 50m+ RANGE (Bottom Right) - Topmost card */}
            <img
              src={getCloudinaryUrl(specs[4].image)}
              alt="50m+ Range"
              style={{
                position: 'absolute',
                width: '126.45px',
                height: '139.96px',
                left: '165px',  // Tightened overlap with 4x4 control
                top: '125px',   // Moved up to close vertical gap
                transform: 'rotate(-2.8deg)',
                zIndex: 25,
              }}
              className="object-contain"
            />
          </div>
        </div>
        </div>
      </section>
    );
}