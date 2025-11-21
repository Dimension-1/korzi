import { ArrowUpRight } from 'lucide-react';

export default function BuiltInIndiaSection() {
  return (
    <section className="bg-black py-8 md:py-16 relative overflow-hidden">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 md:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="space-y-4 md:space-y-8">
            <p 
              className="text-white leading-relaxed text-sm md:text-base"
              style={{ fontFamily: 'DM Sans' }}
            >
              Every K-01 is built and assembled locally with multi-point testing, BIS compliance, and support you can actually reach.
            </p>

            <button className="bg-[#3A3A3A] text-white px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden w-full sm:w-auto">
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-xs md:text-sm" style={{ fontFamily: 'DM Sans', letterSpacing: '0.05em' }}>
                READY TO SHOP?
              </span>
              <ArrowUpRight className="relative z-10 w-4 md:w-5 h-4 md:h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
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
          <div className="flex justify-start lg:justify-end z-10">
            <p 
              className="text-[#02FF00] text-left lg:text-right text-sm md:text-base"
              style={{ fontFamily: 'DM Sans' }}
            >
              If it breaks, we help fix it. If you have questions, we answer.
            </p>
          </div>
        </div>

        {/* Title - Positioned absolutely over the image */}
        <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none px-4">
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
