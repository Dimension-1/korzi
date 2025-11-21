import { useState } from 'react';

export default function PillarsSection() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 0,
      name: 'DESIGN',
      image: '/assets/About/PillarAnimation/Design.png',
      description: 'Machines with purpose, built for balance, motion, and a thrill driving.'
    },
    {
      id: 1,
      name: 'TECHNOLOGY',
      image: '/assets/About/PillarAnimation/Technology.png',
      description: 'Advanced engineering for superior performance and control.'
    },
    {
      id: 2,
      name: 'MATERIALS',
      image: '/assets/About/PillarAnimation/Materials.png',
      description: 'Premium quality materials for durability and strength.'
    },
    {
      id: 3,
      name: 'ACCESSORIES',
      image: '/assets/About/PillarAnimation/Accessories.png',
      description: 'Complete ecosystem of parts and upgrades.'
    },
    {
      id: 4,
      name: 'SERVICE',
      image: '/assets/About/PillarAnimation/Service.png',
      description: 'Dedicated support and maintenance services.'
    },
    {
      id: 5,
      name: 'ACCESSIBILITY',
      image: '/assets/About/PillarAnimation/Accessibility.png',
      description: 'Built for everyone, everywhere, anytime.'
    }
  ];

  return (
    <section className="bg-black text-white py-16 px-4 md:px-8">
      <div className="w-full mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 
            className="uppercase mb-4"
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '64px',
              lineHeight: '64px'
            }}
          >
            OUR FOUNDATION
          </h2>
          <p 
            className="text-gray-400"
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '32px',
              lineHeight: '32px'
            }}
          >
            THE KORZI PILLARS
          </p>
        </div>

        {/* Pillars and Description */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left: Description */}
          <div className="lg:w-1/3">
            <p 
              className="text-white text-lg"
              style={{
                fontFamily: 'DM Sans',
                lineHeight: '1.7'
              }}
            >
              {pillars[activePillar].description}
            </p>
          </div>

          {/* Right: Pillars */}
          <div className="flex items-end gap-4 md:gap-6">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`relative transition-all duration-500 ease-out ${
                  activePillar === pillar.id 
                    ? 'scale-110' 
                    : 'scale-100 hover:scale-105'
                }`}
                style={{
                  height: activePillar === pillar.id ? '400px' : '300px'
                }}
              >
                <img 
                  src={pillar.image}
                  alt={pillar.name}
                  className="h-full w-auto object-contain"
                  style={{
                    filter: activePillar === pillar.id ? 'none' : 'grayscale(100%)'
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
