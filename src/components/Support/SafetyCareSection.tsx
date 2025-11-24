import { ArrowUpRight, Download } from 'lucide-react';

export default function SafetyCareSection() {
  return (
    <section className="bg-black text-white relative py-20 px-6 lg:px-12 overflow-visible">
      {/* Decorative Elements - Right Side (positioned relative to viewport) */}
      <img 
        src="/assets/homepage/Ellipse 81.png" 
        alt="" 
        className="absolute w-[1091px] h-[1092px] pointer-events-none opacity-80"
        style={{ right: 0, top: '80px', zIndex: 0, transform: 'translateX(30%)' }}
      />
      <img 
        src="/assets/homepage/dragonfly.png" 
        alt="" 
        className="absolute w-[547px] h-[401px] pointer-events-none opacity-60"
        style={{ right: '-273.5px', top: '580px', zIndex: 1 }}
      />
      
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          {/* Left Side - Spares & Accessories */}
          <div className="relative">
            <h2 className="text-[#02FF00] text-[48px] leading-[48px] uppercase mb-4" style={{ fontFamily: 'Bebas Neue' }}>
              SPARES & ACCESSORIES
            </h2>
            
            <p className="text-white text-[16px] leading-[24px] mb-8">
              Everything you need to keep your machine running:
            </p>

            {/* Parts Table */}
            <div className="grid grid-cols-2 gap-0 border border-white/30 mb-8">
              <div className="border-r border-b border-white/30 px-4 py-3 text-white text-[14px]">Batteries</div>
              <div className="border-b border-white/30 px-4 py-3 text-white text-[14px]">Suspension parts</div>
              <div className="border-r border-b border-white/30 px-4 py-3 text-white text-[14px]">Chargers</div>
              <div className="border-b border-white/30 px-4 py-3 text-white text-[14px]">Clips, screws, hardware</div>
              <div className="border-r border-white/30 px-4 py-3 text-white text-[14px]">Shells & bodies</div>
              <div className="px-4 py-3 text-white text-[14px]">Controllers</div>
              <div className="border-r border-t border-white/30 px-4 py-3 text-white text-[14px]">Tires</div>
              <div className="border-t border-white/30 px-4 py-3 text-white text-[14px]"></div>
            </div>

            <button className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer w-full max-w-[240px] h-[46px]">
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[11px] leading-[16px] uppercase font-medium">
                REQUEST A PART OR ACCESSORY
              </span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Right Side - Manuals & Guides */}
          <div className="relative">
            
            <div className="relative z-10">
              <h2 className="text-[#02FF00] text-[48px] leading-[48px] uppercase mb-4" style={{ fontFamily: 'Bebas Neue' }}>
                MANUALS & GUIDES
              </h2>
              
              <p className="text-white text-[16px] leading-[24px] mb-6">
                Download Resources
              </p>

              {/* Download Buttons */}
              <div className="flex gap-4 mb-6">
                <button className="bg-[#1a1a1a] border border-white/30 px-5 py-3 text-white text-[13px] hover:bg-[#02FF00] hover:text-black transition-colors flex items-center gap-2">
                  K-01 Full User Manual (PDF)
                  <Download className="w-4 h-4 text-[#02FF00]" />
                </button>
                <button className="bg-[#1a1a1a] border border-white/30 px-5 py-3 text-white text-[13px] hover:bg-[#02FF00] hover:text-black transition-colors flex items-center gap-2">
                  "How to Fix Common Issues" Guide
                  <Download className="w-4 h-4 text-[#02FF00]" />
                </button>
              </div>

              <p className="text-white text-[14px] leading-[20px] mb-8">
                All manuals are written to be simple, visual, and beginner-friendly.
              </p>

              <button className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer w-full max-w-[200px] h-[46px]">
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[11px] leading-[16px] uppercase font-medium">
                  VIEW ALL DOWNLOADS
                </span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Safety & Care (BIS Certified) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-stretch relative">
          {/* Decorative Elements - Left Side */}
          <img 
            src="/assets/homepage/Ellipse80.png" 
            alt="" 
            className="absolute w-[1091px] h-[1092px] pointer-events-none"
            style={{ left: '-400.5px', top: '0px', zIndex: 0 }}
          />
          <img 
            src="/assets/homepage/dragonfly.png" 
            alt="" 
            className="absolute w-[547px] h-[401px] pointer-events-none opacity-60"
            style={{ left: '-368.5px', top: '443px', zIndex: 1 }}
          />

          {/* Left - Text Content */}
          <div className="px-12 flex flex-col justify-start relative z-10 text-right">
            <h2 className="text-[#02FF00] text-[48px] leading-[52px] uppercase mb-6" style={{ fontFamily: 'Bebas Neue' }}>
              SAFETY & CARE<br />(BIS CERTIFIED)
            </h2>
            
            <p className="text-white text-[15px] leading-[24px]">
              Korzi machines are BIS-certified<br />
              and built with child-safe materials.<br />
              Strong outside, safe inside.
            </p>
          </div>

          {/* Center - Image with BIS Badge */}
          <div className="relative bg-gradient-to-br from-gray-300 to-gray-500 min-h-[200px] flex items-center justify-center overflow-visible">
            <img 
              src="/assets/Support/safety.png" 
              alt="Korzi RC Car" 
              className="w-full h-full object-cover"
            />
            
            {/* BIS Certified Logo */}
            <img 
              src="/assets/Support/logo.png" 
              alt="BIS Certified" 
              className="absolute -top-7 -right-16 w-36 h-36 z-20"
            />
          </div>

          {/* Right - Care Tips */}
          <div className="px-12 py-30 flex flex-col justify-end relative z-10">
            <div className="border-t border-white/30 pt-1"></div>
            <h3 className="text-white/30 text-[16px] font-normal ">Care Tips:</h3>
            <div className="border-b border-white/30 pt-1 mb-2"></div>
            <ul className="space-y-4 mb-4">
                <li className="text-white text-[14px] flex items-start gap-3">
                  <span className="text-[#02FF00] mt-0.5">→</span>
                  <span>Allow battery to cool before charging</span>
                </li>
                <li className="text-white text-[14px] flex items-start gap-3">
                  <span className="text-[#02FF00] mt-0.5">→</span>
                  <span>Keep away from water</span>
                </li>
                <li className="text-white text-[14px] flex items-start gap-3">
                  <span className="text-[#02FF00] mt-0.5">→</span>
                  <span>Clean wheels after dirt runs</span>
                </li>
                <li className="text-white text-[14px] flex items-start gap-3">
                  <span className="text-[#02FF00] mt-0.5">→</span>
                  <span>Don't charge with unknown adaptors</span>
                </li>
                <li className="text-white text-[14px] flex items-start gap-3">
                  <span className="text-[#02FF00] mt-0.5">→</span>
                  <span>Store with battery disconnected</span>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
