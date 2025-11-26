import { ArrowUpRight } from 'lucide-react';

export default function BuiltInIndiaSection() {
  return (
    <section className="bg-black py-8 md:py-16 relative overflow-hidden">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 md:px-8 relative z-10">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center">
          {/* Title - Mobile */}
          <h2 
            className="uppercase text-transparent leading-tight -mb-7"
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '48px',
              lineHeight: '52px',
              WebkitTextStroke: '1.5px white',
              letterSpacing: '0.02em'
            }}
          >
            BUILT STRONG.<br />BUILT SAFE.<br />BUILT IN INDIA.
          </h2>

          {/* Car Image - Mobile */}
          <div className="relative -mt-12 flex right-20 w-full">
            <img 
              src="/assets/homepage/Car_1.png" 
              alt="Korzi RC Car" 
              className="w-[120%] max-w-none h-auto"
            />
          </div>

          {/* Description Text - Mobile */}
          <p 
            className="text-white leading-relaxed text-sm max-w-sm mt-4 px-4"
            style={{ fontFamily: 'DM Sans' }}
          >
            Every K-01 is built and assembled locally with multi-point testing, BIS compliance, and support you can actually reach.
          </p>

          {/* Support Text - Mobile */}
          <p 
            className="text-[#02FF00] text-sm mt-4"
            style={{ fontFamily: 'DM Sans' }}
          >
            If it breaks, we help fix it. If you have questions, we answer.
          </p>

          {/* Button - Mobile */}
          <button className="bg-[#3A3A3A] text-white px-6 py-3 flex items-center gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden mt-6">
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-xs" style={{ fontFamily: 'DM Sans', letterSpacing: '0.05em' }}>
              READY TO SHOP?
            </span>
            <ArrowUpRight className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-[1fr_2fr_1fr] gap-8 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <p 
              className="text-white leading-relaxed text-base"
              style={{ fontFamily: 'DM Sans' }}
            >
              Every K-01 is built and assembled locally with multi-point testing, BIS compliance, and support you can actually reach.
            </p>

            <button className="bg-[#3A3A3A] text-white px-6 py-3 flex items-center gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden w-auto">
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-sm" style={{ fontFamily: 'DM Sans', letterSpacing: '0.05em' }}>
                READY TO SHOP?
              </span>
              <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Center: Car Image */}
          <div className="flex justify-center">
            <img 
              src="/assets/homepage/Car_1.png" 
              alt="Korzi RC Car" 
              className="w-full max-w-2xl h-auto"
            />
          </div>

          {/* Right: Support Text */}
          <div className="flex justify-end z-10">
            <p 
              className="text-[#02FF00] text-right text-base"
              style={{ fontFamily: 'DM Sans' }}
            >
              If it breaks, we help fix it. If you have questions, we answer.
            </p>
          </div>
        </div>

        {/* Title - Desktop only, positioned absolutely over the image */}
        <div className="hidden lg:block absolute top-8 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none px-4">
          <h2 
            className="uppercase text-transparent"
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '80px',
              lineHeight: '80px',
              WebkitTextStroke: '2px white',
              letterSpacing: '0.02em'
            }}
          >
            BUILT STRONG. BUILT SAFE. BUILT IN INDIA.
          </h2>
        </div>
      </div>
    </section>
  );
}
