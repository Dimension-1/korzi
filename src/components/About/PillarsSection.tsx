import { useState } from 'react';

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
    <section className="bg-black py-16 px-8 md:px-16 lg:px-24">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="uppercase text-5xl md:text-6xl lg:text-7xl mb-2 inline-block"
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
            className="uppercase text-3xl md:text-4xl lg:text-5xl inline-block"
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

        {/* Pillars Grid */}
        <div className="flex justify-between items-end gap-0 md:gap-1 lg:gap-2 min-h-[500px] relative">
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
                    src={isActive ? '/assets/About/PillarAnimation/Green.png' : '/assets/About/PillarAnimation/Black.png'}
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

        {/* Promise Image */}
        <div className="mt-16 flex justify-center">
          <img 
            src="/assets/About/Promise.png" 
            alt="Korzi Promise" 
            style={{
              width: '668px',
              height: '725px'
            }}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
