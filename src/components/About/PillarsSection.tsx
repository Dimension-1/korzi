import { useState } from 'react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


interface Pillar {
  id: number;
  label: string;
  description: string;
}

export default function PillarsSection() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars: Pillar[] = [
    { id: 1, label: 'DESIGN', description: 'Machines with purpose, built for balance, motion, and a thrill driving.' },
    { id: 2, label: 'TECHNOLOGY', description: 'Engineering that delivers smooth control, real performance, and zero complication.' },
    { id: 3, label: 'MATERIALS', description: 'Premium components chosen for durability, precision, and lasting quality.' },
    { id: 4, label: 'ACCESSORIES', description: 'Thoughtful additions that enhance every ride and expand possibilities.' },
    { id: 5, label: 'SERVICE', description: 'Support that keeps you moving with expert care and quick solutions.' },
    { id: 6, label: 'ACCESSIBILITY', description: 'Built for everyone, designed to be intuitive, inclusive, and easy to use.' }
  ];

  return (
    <section className="bg-black py-8 md:py-16 px-4 md:px-8 lg:px-24 min-h-[600px] md:min-h-[800px]">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 
            className="uppercase text-3xl md:text-6xl lg:text-7xl mb-2 inline-block"
            style={{
              fontFamily: 'Bebas Neue',
              fontWeight: 700,
              lineHeight: '1',
              background: 'linear-gradient(100.06deg, #FFFFFF 2.37%, #999999 57.42%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            OUR FOUNDATION
          </h1>
          <br />
          <p 
            className="uppercase text-xl md:text-4xl lg:text-5xl inline-block"
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              lineHeight: '1',
              letterSpacing: '0.1em',
              background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            THE KORZI PILLARS
          </p>
        </div>

        {/* Pillars Grid - Desktop */}
        <div className="hidden lg:flex justify-between items-end gap-0 md:gap-1 lg:gap-2 min-h-[500px] relative">
          {pillars.map((pillar, index) => {
            const isActive = activePillar === pillar.id;
            const isLastPillar = index === pillars.length - 1;
            
            return (
              <div key={pillar.id} className="relative flex items-end">
                <button
                  onClick={() => setActivePillar(isActive ? null : pillar.id)}
                  className="relative transition-all duration-500 ease-out cursor-pointer"
                  style={{
                    width: '100px',
                    height: isActive ? '500px' : '350px'
                  }}
                >
                  {/* Pillar Image */}
                  <img
                    src={getCloudinaryUrl(isActive ? '/assets/About/PillarAnimation/Green.webp' : '/assets/About/PillarAnimation/Black.webp')}
                    alt={pillar.label}
                    className="w-full h-full object-contain transition-all duration-500"
                  />
                  
                  {/* Label */}
                  <div className="absolute bottom-12 left-8">
                    <span 
                      className={`font-body transition-colors duration-500 block ${
                        isActive ? 'text-black' : 'text-white'
                      }`}
                      style={{ 
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '28px',
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'bottom left',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {pillar.label}
                    </span>
                  </div>
                </button>

                {/* Description Text - right side for all except last pillar (left side) */}
                {isActive && (
                  <div 
                    className="absolute top-8 animate-fadeIn"
                    style={{
                      left: isLastPillar ? 'auto' : '120px',
                      right: isLastPillar ? '120px' : 'auto',
                      width: '300px'
                    }}
                  >
                    <p className="font-body text-white text-[16px] leading-[26px]">
                      {pillar.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Description - Above pillars */}
        <div className="lg:hidden text-center mb-6 px-4 min-h-[60px]">
          {activePillar && (
            <p className="text-white text-sm" style={{ fontFamily: 'DM Sans', lineHeight: '1.6' }}>
              {pillars.find(p => p.id === activePillar)?.description}
            </p>
          )}
        </div>

        {/* Pillars Grid - Mobile (3x2) */}
        <div className="lg:hidden grid grid-cols-3 gap-2 justify-items-center mb-8">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              className="relative cursor-pointer"
              onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
              style={{ width: '80px', height: '140px' }}
            >
              <img
                src={getCloudinaryUrl(activePillar === pillar.id ? '/assets/About/PillarAnimation/green_mobile.webp' : '/assets/About/PillarAnimation/Black.webp')}
                alt={pillar.label}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-5 left-8">
                <span 
                  className={`block transition-colors duration-300 ${
                    activePillar === pillar.id ? 'text-black' : 'text-white'
                  }`}
                  style={{ 
                    fontFamily: 'DM Sans',
                    fontSize: '8px',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'bottom left',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {pillar.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Promise Image */}
        <div className="mt-8 md:mt-16 flex justify-center ">
          <img 
            src={getCloudinaryUrl('/assets/About/Promise.webp')} 
            alt="Korzi Promise" 
            className="w-[110%] max-w-none md:max-w-[668px] md:w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
