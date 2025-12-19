import { ArrowUpRight, Download } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function SafetyCareSection() {
  return (
    <section className="bg-black text-white relative pt-1 pb-2 lg:pb-20 px-6 lg:px-12 overflow-visible">
      {/* Decorative Elements - Desktop Only */}
      <img 
        src="/assets/homepage/Ellipse 81.png" 
        alt="" 
        className="hidden lg:block absolute w-[1091px] h-[1092px] pointer-events-none opacity-80"
        style={{ right: 0, top: '30px', zIndex: 0, transform: 'translateX(30%)' }}
      />
      <img 
        src={getCloudinaryUrl('/assets/homepage/dragonfly.png')} 
        alt="" 
        className="hidden lg:block absolute w-[547px] h-[401px] pointer-events-none opacity-60"
        style={{ right: '-273.5px', top: '480px', zIndex: 1 }}
      />
      <img 
        src={getCloudinaryUrl('/assets/homepage/Ellipse80.png')} 
        alt="" 
        className="hidden lg:block absolute w-[1391px] h-[1092px] pointer-events-none"
        style={{ left: '-545.5px', top: '370px', zIndex: 0 }}
      />
      <img 
        src={getCloudinaryUrl('/assets/homepage/dragonfly.png')} 
        alt="" 
        className="hidden lg:block absolute w-[547px] h-[401px] pointer-events-none opacity-60"
        style={{ left: '-273.5px', top: '843px', zIndex: 1 }}
      />
      
      {/* Decorative Elements - Mobile Only - Safety & Care Left */}
      <img 
        src={getCloudinaryUrl('/assets/homepage/Ellipse80.png')} 
        alt="" 
        className="lg:hidden absolute w-[293px] h-[394px] pointer-events-none"
        style={{ left: '-80px', top: '700px', zIndex: 0 }}
      />
      <img 
        src={getCloudinaryUrl('/assets/homepage/dragonfly.png')} 
        alt="" 
        className="lg:hidden absolute w-[200px] h-[147px] pointer-events-none opacity-60"
        style={{ left: '-100px', top: '870px', zIndex: 1 }}
      />
      
      {/* Decorative Elements - Mobile Only - Care Tips Bottom Right */}
      <img 
        src="/assets/homepage/Ellipse 81.png" 
        alt="" 
        className="lg:hidden absolute w-[293px] h-[394px] pointer-events-none opacity-80"
        style={{ right: '-100px', bottom: '-200px', zIndex: 0 }}
      />
      <img 
        src={getCloudinaryUrl('/assets/homepage/dragonfly.png')} 
        alt="" 
        className="lg:hidden absolute w-[200px] h-[147px] pointer-events-none opacity-60"
        style={{ right: '-100px', bottom: '-120px', zIndex: 1 }}
      />
      
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          {/* Left Side - Spares & Accessories */}
          <div className="relative">
            <h2 className="text-[#02FF00] text-[40px] leading-[40px] uppercase mb-3" style={{ fontFamily: 'Bebas Neue' }}>
              SPARES & ACCESSORIES
            </h2>
            
            <p className="text-white text-[14px] leading-[20px] mb-6">
              Everything you need to keep your machine running:
            </p>

            {/* Parts Table */}
            <div className="grid grid-cols-2 gap-0 border border-white/30 mb-6">
              <div className="border-r border-b border-white/30 px-3 py-2 text-white text-[13px]">Batteries</div>
              <div className="border-b border-white/30 px-3 py-2 text-white text-[13px]">Suspension parts</div>
              <div className="border-r border-b border-white/30 px-3 py-2 text-white text-[13px]">Chargers</div>
              <div className="border-b border-white/30 px-3 py-2 text-white text-[13px]">Clips, screws, hardware</div>
              <div className="border-r border-white/30 px-3 py-2 text-white text-[13px]">Shells & bodies</div>
              <div className="px-3 py-2 text-white text-[13px]">Controllers</div>
              <div className="border-r border-t border-white/30 px-3 py-2 text-white text-[13px]">Tires</div>
              <div className="border-t border-white/30 px-3 py-2 text-white text-[13px]"></div>
            </div>

            <button 
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=support@korzi.toys&su=Request%20a%20Part%20or%20Accessory', '_blank')}
              className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer w-full max-w-[220px] h-[42px]"
            >
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[10px] leading-[14px] uppercase font-medium">
                REQUEST A PART OR ACCESSORY
              </span>
              <ArrowUpRight className="relative z-10 w-3 h-3 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Right Side - Manuals & Guides */}
          <div className="relative">
            
            <div className="relative z-10">
              <h2 className="text-[#02FF00] text-[40px] leading-[40px] uppercase mb-3" style={{ fontFamily: 'Bebas Neue' }}>
                MANUALS & GUIDES
              </h2>
              
              <p className="text-white text-[14px] leading-[20px] mb-5">
                Download Resources
              </p>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                <button className="border border-white/30 text-white text-[12px] flex items-center relative overflow-hidden group">
                  <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="flex-1 px-4 py-2.5 text-left relative z-10 group-hover:text-black transition-colors duration-300">K-01 Full User Manual (PDF)</span>
                  <div className="border-l border-white/30 px-4 py-2.5 flex items-center justify-center relative z-10">
                    <Download className="w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
                  </div>
                </button>
                <button className="border border-white/30 text-white text-[12px] flex items-center relative overflow-hidden group">
                  <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="flex-1 px-4 py-2.5 text-left relative z-10 group-hover:text-black transition-colors duration-300">"How to Fix Common Issues" Guide</span>
                  <div className="border-l border-white/30 px-4 py-2.5 flex items-center justify-center relative z-10">
                    <Download className="w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
                  </div>
                </button>
              </div>

              <p className="text-white text-[13px] leading-[18px] mb-6">
                All manuals are written to be simple, visual, and beginner-friendly.
              </p>

              <button 
                className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer w-full max-w-[180px] h-[42px]"
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[10px] leading-[14px] uppercase font-medium">
                  VIEW ALL DOWNLOADS
                </span>
                <ArrowUpRight className="relative z-10 w-3 h-3 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Safety & Care (BIS Certified) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-stretch relative">
          

          {/* Left - Text Content */}
          <div className="px-4 lg:px-12 flex flex-col justify-start relative z-10 text-right order-1 lg:order-none mb-8 lg:mb-0">
            <h2 className="text-[#02FF00] text-[32px] lg:text-[48px] leading-[36px] lg:leading-[52px] uppercase mb-4 lg:mb-6" style={{ fontFamily: 'Bebas Neue' }}>
              SAFETY & CARE<br />(BIS CERTIFIED)
            </h2>
            
            <p className="text-white text-[14px] leading-[22px]">
              Korzi machines are BIS-certified<br />
              and built with child-safe materials.<br />
              Strong outside, safe inside.
            </p>
          </div>

          {/* Center - Image with BIS Badge */}
          <div className="relative bg-gradient-to-br from-gray-300 to-gray-500 min-h-[200px] flex items-center justify-center overflow-visible order-2 lg:order-none max-w-[320px] lg:max-w-none mx-auto mb-8 lg:mb-0">
            <img 
              src={getCloudinaryUrl('/assets/Support/safety.png')} 
              alt="Korzi RC Car" 
              className="w-full h-full object-cover"
            />
            
            {/* BIS Certified Logo */}
            <img 
              src={getCloudinaryUrl('/assets/Support/logo.png')} 
              alt="BIS Certified" 
              className="absolute -top-4 -left-8 lg:-top-7 lg:left-auto lg:-right-16 w-24 h-24 lg:w-36 lg:h-36 z-20"
            />
          </div>

          {/* Right - Care Tips */}
          <div className="px-4 lg:px-12 py-0 lg:py-30 flex flex-col justify-start lg:justify-end relative z-10 order-3 lg:order-none">
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
