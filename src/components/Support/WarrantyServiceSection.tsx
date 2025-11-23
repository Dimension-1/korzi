import { ArrowUpRight } from 'lucide-react';

export default function WarrantyServiceSection() {
  return (
    <section className="bg-black text-white relative py-20 px-6 lg:px-12" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 0 }}>
          {/* Top Left - Muddy Car Image */}
          <div className="bg-black" style={{ width: '600px', height: '400px' }}>
            <img 
              src="/assets/Support/warranty.png" 
              alt="Muddy RC Car" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right - Warranty Information */}
          <div className="bg-[#1a1a1a]" style={{ width: '600px', height: '400px', padding: '14px 20px' }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-[#02FF00] text-[32px] leading-[48px] uppercase" style={{ fontFamily: 'Bebas Neue' }}>
                WARRANTY INFORMATION
              </h2>
              <div 
                className="bg-[#02FF00] text-black px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ml-3 relative"
                style={{
                  clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)'
                }}
              >
                Standard Warranty: 2 Months
              </div>
            </div>

            {/* Warranty Details Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-0 mb-3">
              {/* Covers Column */}
              <div>
                <div className="border-t border-[#595959] mb-3"></div>
                <h3 className="text-[#919191] text-[13px] leading-[11px] mb-3">Covers:</h3>
                <div className="border-t border-[#595959] mb-4"></div>
                <ul className="text-white text-[13px] leading-[16px] space-y-3">
                  <li>Motor failure</li>
                  <li>ESC issues</li>
                  <li>Controller malfunction</li>
                  <li>Charging defects</li>
                  <li>Delivery damage</li>
                </ul>
              </div>

              {/* Does Not Cover Column */}
              <div>
                <div className="border-t border-[#595959] mb-3"></div>
                <h3 className="text-[#919191] text-[13px] leading-[11px] mb-3">Does Not Cover:</h3>
                <div className="border-t border-[#595959] mb-4"></div>
                <ul className="text-white text-[13px] leading-[16px] space-y-3">
                  <li>Water damage</li>
                  <li>Intentional impact or misuse</li>
                  <li>Burned electronics due to wrong chargers</li>
                  <li>Modified devices</li>
                </ul>
              </div>
            </div>

            <button className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer" style={{ width: '130px', height: '38px' }}>
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[10px] leading-[14px] uppercase">
                START A CLAIM
              </span>
              <ArrowUpRight className="relative z-10 w-2.5 h-2.5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Bottom Left - Service & Repairs */}
          <div className="bg-[#151515]" style={{ width: '600px', height: '400px', padding: '14px 20px' }}>
            <h2 className="text-[#02FF00] text-[32px] leading-[48px] uppercase mb-3" style={{ fontFamily: 'Bebas Neue' }}>
              SERVICE & REPAIRS
            </h2>

            <div className="border-t border-[#595959] mb-3"></div>
            <h3 className="text-[#919191] text-[13px] leading-[11px] mb-3">How We Help:</h3>
            <div className="border-t border-[#595959] mb-4"></div>
            
            <ul className="text-white text-[13px] leading-[16px] space-y-3 mb-4">
              <li>Diagnose the issue</li>
              <li>Provide guidance to fix at home (most problems take 5 minutes)</li>
              <li>Ship compatible spares as per stock availability</li>
              <li>Arrange repair service when needed</li>
            </ul>

            <div className="border-t border-[#595959] mb-3"></div>
            <h3 className="text-[#919191] text-[13px] leading-[11px] mb-3">Where We Service:</h3>
            <div className="border-t border-[#595959] mb-4"></div>
            
            <p className="text-white text-[13px] leading-[16px] mb-4">
              Pan-India support, with a workshop in Bangalore for repairs.
            </p>

            <button className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[4px] border-[#02FF00] group relative overflow-hidden cursor-pointer mt-auto" style={{ width: '130px', height: '38px' }}>
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-[10px] leading-[14px] uppercase">
                BOOK A REPAIR
              </span>
              <ArrowUpRight className="relative z-10 w-2.5 h-2.5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Bottom Right - Repair Image */}
          <div className="bg-black" style={{ width: '600px', height: '400px' }}>
            <img 
              src="/assets/Support/repair.png" 
              alt="Repair Service" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
