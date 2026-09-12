import { useState } from 'react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


const tabs = [
  'DESCRIPTION',
  'CORE SPECIFICATIONS',
  'BUILD & DIMENSIONS',
  'PERFORMANCE & MECHANICS',
  "WHAT'S IN THE BOX",
  'WARRANTY & SUPPORT'
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full bg-black py-4 md:py-16 min-h-[600px] md:min-h-[700px]">
      <div className="w-full mx-auto px-0 md:px-8">
        {/* Tabs */}
        <div className="relative">
          <div className="flex border-t border-b border-zinc-800 overflow-x-auto scrollbar-hide bg-[#0F0F0F]">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-2.5 lg:px-6 lg:py-3 text-xs lg:text-sm font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeTab === idx
                    ? 'text-white bg-zinc-900 border-t-2 border-t-[#02FF00]'
                    : 'text-zinc-500 hover:text-zinc-300 bg-[#0F0F0F]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black via-[#0F0F0F] to-transparent pointer-events-none flex items-center justify-end pr-2 lg:hidden">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Tab Content */}
        <div className="border-x border-b border-zinc-800 bg-[#0F0F0F] min-h-[600px] md:min-h-[650px]">
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
              <div className="p-4 md:p-8 space-y-4 md:space-y-6 text-white">
                <p className="text-sm md:text-base leading-relaxed">
                  The K-01 drives with attitude tight suspension, a punchy motor, and a body that doesn't back down from impact.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Every squeeze of the throttle feels intentional, every turn feels clean.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  It's a small machine with a big-machine spirit, built to deliver real drive anywhere you take it.
                </p>
              </div>
              <div className="bg-zinc-900 flex items-center justify-center p-0 overflow-hidden">
                <img 
                  src={getCloudinaryUrl('/assets/Product/ProductTabs/Desc.webp')} 
                  alt="Product" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
              <div className="p-4 md:p-8 space-y-2 md:space-y-3 text-white">
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Scale</span>
                  <span className="text-sm md:text-base">1:16</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Drive</span>
                  <span className="text-sm md:text-base">4WD</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Top Speed:</span>
                  <span className="text-sm md:text-base">Up to 25 km/h</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Control Range</span>
                  <span className="text-sm md:text-base">50+ meters</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Battery</span>
                  <span className="text-sm md:text-base">1200 mAh Rechargeable Li-ion Pack (7.4V)</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Run Time</span>
                  <span className="text-sm md:text-base">~25 minutes (surface & style dependent)</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Charge Time</span>
                  <span className="text-sm md:text-base flex items-center gap-2">
                    <span className="bg-[#02FF00] text-black px-2 py-0.5 text-[8px] md:text-xs uppercase font-bold">SLOW CHARGE FOR SAFETY</span>
                    ~180 minutes
                  </span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Controller</span>
                  <span className="text-sm md:text-base">2.4 GHz Remote</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2">
                  <span className="text-sm md:text-base font-bold text-white">Age</span>
                  <span className="text-sm md:text-base">6+ (adult supervision recommended)</span>
                </div>
              </div>
              <div className="bg-zinc-900 flex items-center justify-center p-0 overflow-hidden">
                <img 
                  src={getCloudinaryUrl('/assets/Product/ProductTabs/CoreSpecs.webp')} 
                  alt="Specifications" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
              <div className="p-4 md:p-8 space-y-2 md:space-y-3 text-white">
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Product Dimensions (L × W × H)</span>
                  <span className="text-sm md:text-base">29.8 × 17.7 × 12.5 cm</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Box Dimensions (L × W × H)</span>
                  <span className="text-sm md:text-base">42 × 23 × 20.2 cm</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Product Weight</span>
                  <span className="text-sm md:text-base">852.6g (with battery)</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 gap-x-16">
                  <span className="text-sm md:text-base font-bold text-white">Material</span>
                  <span className="text-sm md:text-base text-right">ABS Shell, PA Components, Reinforced Chassis, Hardware & Electronics</span>
                </div>
              </div>
              <div className="bg-zinc-900 flex items-center justify-center p-0 overflow-hidden">
                <img 
                  src={getCloudinaryUrl('/assets/Product/ProductTabs/builddim.webp')} 
                  alt="Dimensions" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
              <div className="p-4 md:p-8 space-y-2 md:space-y-3 text-white">
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Steering</span>
                  <span className="text-sm md:text-base">Front Wheel Steering</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Motor Type</span>
                  <span className="text-sm md:text-base">Brushed (7.4V)</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Motor RPM</span>
                  <span className="text-sm md:text-base">22,000 RPM</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Gear Ratio</span>
                  <span className="text-sm md:text-base">1:86</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Differential</span>
                  <span className="text-sm md:text-base">Open</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">ESC Rating</span>
                  <span className="text-sm md:text-base">7.4V, Max 60A</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Suspension</span>
                  <span className="text-sm md:text-base">Independent</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Suspension Type</span>
                  <span className="text-sm md:text-base">Swing Arm</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2 border-b border-zinc-800">
                  <span className="text-sm md:text-base font-bold text-white">Wheelbase</span>
                  <span className="text-sm md:text-base">178 mm</span>
                </div>
                <div className="flex justify-between py-1.5 md:py-2">
                  <span className="text-sm md:text-base font-bold text-white">Tire Diameter</span>
                  <span className="text-sm md:text-base">66 mm</span>
                </div>
              </div>
              <div className="bg-zinc-900 flex items-center justify-center p-0 overflow-hidden">
                <img 
                  src={getCloudinaryUrl('/assets/Product/ProductTabs/performance.webp')} 
                  alt="Mechanics" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
              <div className="p-4 md:p-8 space-y-3 md:space-y-4 text-white">
                <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-[#02FF00]">→</span>
                    <span>1 x Apex Drive K-01 RC Machine (1:16, 4WD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#02FF00]">→</span>
                    <span>1 x 2.4GHz Anti-Interference Controller</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#02FF00]">→</span>
                    <span>1 x Rechargeable Li-ion Battery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#02FF00]">→</span>
                    <span>1 x USB Charging Cable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#02FF00]">→</span>
                    <span>1 x Screwdriver</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#02FF00]">→</span>
                    <span>1 x User Manual</span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900 flex items-center justify-center p-0 overflow-hidden">
                <img 
                  src={getCloudinaryUrl('/assets/Product/ProductTabs/whatinbox.webp')} 
                  alt="Box Contents" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 5 && (
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
              <div className="p-4 md:p-8 space-y-4 md:space-y-6 text-white">
                <p className="text-sm md:text-base leading-relaxed">
                  Korzi Care provides comprehensive coverage for manufacturing defects and normal wear. Local service available across India.
                </p>
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-bold text-white">Covered:</h3>
                  <ul className="space-y-2 text-sm md:text-base">
                    <li>• Motor and drivetrain issues</li>
                    <li>• Electronic component failures</li>
                    <li>• Structural defects</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-[#02FF00] leading-relaxed">
                    Repair assistance available through Korzi Support.
                  </p>
                  <p className="text-sm md:text-base text-[#02FF00] leading-relaxed">
                    Local team. Real humans. Real service.
                  </p>
                </div>
              </div>
              <div className="bg-zinc-900 flex items-center justify-center p-0 overflow-hidden">
                <img 
                  src={getCloudinaryUrl('/assets/Product/ProductTabs/warranty.webp')} 
                  alt="Warranty" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
