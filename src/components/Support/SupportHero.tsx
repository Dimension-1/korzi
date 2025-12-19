import { ArrowUpRight } from 'lucide-react';

export default function SupportHero() {
  return (
    <section className="bg-black text-white py-8 lg:py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Title */}
        <h1 
          className="uppercase text-4xl text-center mb-8 md:text-5xl lg:text-6xl"
          style={{
            fontFamily: 'Bebas Neue',
            lineHeight: '1',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          REAL MACHINES. REAL SUPPORT.
        </h1>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-white text-base md:text-lg leading-relaxed mb-2">
            When you buy a Korzi machine, you don't buy and disappear.
          </p>
          <p className="text-white text-base md:text-lg leading-relaxed mb-2">
            You get a team that understands motion, breakdowns, tuning, repairs, and real-world play.
          </p>
          <p className="text-white text-base md:text-lg leading-relaxed">
            We're here to keep your machine running and keep you driving.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Report an Issue */}
          <div className="border border-white/20 p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-[#02FF00] font-bebas text-3xl mb-4 tracking-wide">
                Report an Issue
              </h3>
              <p className="text-white text-base leading-relaxed">
                Facing a problem? Tell us what's happening and we'll guide you step-by-step.
              </p>
            </div>
            <button 
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=support@korzi.toys&su=Support%20Request%20-%20Order%20ID:%20', '_blank')}
              className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[3px] border-[#02FF00] group relative overflow-hidden cursor-pointer mt-8 py-3 px-6 w-fit"
            >
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-sm">
                SUBMIT A SUPPORT REQUEST
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Replacement / Spare Parts */}
          <div className="border border-white/20 p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-[#02FF00] font-bebas text-3xl mb-4 tracking-wide">
                Replacement / Spare Parts
              </h3>
              <p className="text-white text-base leading-relaxed">
                Need a part replaced or serviced? We'll help source it.
              </p>
            </div>
            <button 
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=support@korzi.toys&su=Request%20a%20Part', '_blank')}
              className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[3px] border-[#02FF00] group relative overflow-hidden cursor-pointer mt-8 py-3 px-6 w-fit"
            >
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-sm">
                REQUEST A PART
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>

          {/* Warranty Claim */}
          <div className="border border-white/20 p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-[#02FF00] font-bebas text-3xl mb-4 tracking-wide">
                Warranty Claim
              </h3>
              <p className="text-white text-base leading-relaxed">
                BIS-certified, tested, and backed. If it's our fault, we fix it.
              </p>
            </div>
            <button 
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=support@korzi.toys&su=Warranty%20Claim%20-%20Order%20ID:%20', '_blank')}
              className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[3px] border-[#02FF00] group relative overflow-hidden cursor-pointer mt-8 py-3 px-6 w-fit"
            >
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-sm">
                START A CLAIM
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
