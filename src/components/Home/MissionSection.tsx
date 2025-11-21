import { ArrowUpRight } from 'lucide-react';

export default function MissionSection() {
  return (
    <section className="bg-black py-16">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-8">
        {/* Mission Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h3 
              className="uppercase mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '48px',
                lineHeight: '48px',
              }}
            >
              WE'RE ALSO FIXING HOW PEOPLE THINK ABOUT TOYS.
            </h3>

            <p className="text-white mb-6" style={{ fontFamily: 'DM Sans', fontSize: '16px', lineHeight: '24px' }}>
              Somewhere along the way, toys became soft, disposable, and forgettable.<br />
              We grew up, but the machines we loved didn't.<br />
              Korzi exists to change that.
            </p>

            <p className="text-white font-bold mb-8" style={{ fontFamily: 'DM Sans', fontSize: '16px', lineHeight: '24px' }}>
              Because the world doesn't need low quality toys.<br />
              It needs machines that make you learn and feel alive.
            </p>

            <button className="bg-[#3A3A3A] text-white px-8 py-3 flex items-center gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden">
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', fontSize: '14px', letterSpacing: '0.05em' }}>
                JOIN US
              </span>
              <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Right: Circuit Board Image */}
          <div className="relative">
             <div className="text-[#02FF00] text-6xl">
              <img 
                src="/assets/homepage/network.png" 
                alt="Network circuit board"
                className="w-full h-auto max-w-full"
                style={{ filter: 'brightness(1.2)' }}
              />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
