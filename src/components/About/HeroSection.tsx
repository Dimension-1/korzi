import { getCloudinaryUrl } from "../../utils/cloudinary";

export default function HeroSection() {
  return (
    <section className="bg-black text-white py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16 min-h-[600px] md:min-h-[800px]">
      <div className="w-full mx-auto">
        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16 text-center lg:text-left">
          {/* Left: Title */}
          <div>
            <h1 
              className="uppercase text-3xl md:text-5xl lg:text-[64px] lg:leading-[72px]"
              style={{
                fontFamily: 'Bebas Neue',
                lineHeight: '1.1',
                background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              FOR THE LOVE OF<br className="hidden lg:block" /> MACHINES.
            </h1>
          </div>

          {/* Right: Description */}
          <div className="flex items-center">
            <p 
              className="text-sm md:text-2xl lg:text-[28px] lg:leading-[48px]"
              style={{ 
                fontFamily: 'DM Sans',
                fontWeight: 200,
                background: 'radial-gradient(100% 100% at 0% 3.47%, #FFFFFF 0%, #999999 53.79%, #02FF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Korzi is built for people who feel something <span className="text-[#02FF00]">when things move</span> the ones who like control, speed, balance, <span className="text-[#02FF00]">and the thrill of driving anything with wheels.</span>
            </p>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="flex items-end gap-6 lg:gap-8">
          {/* Main Image Container */}
          <div className="relative w-full max-w-[1024px]">
            <img 
              src={getCloudinaryUrl('/assets/About/Hero Section/Main.webp')} 
              alt="Korzi RC Machines" 
              className="hidden md:block w-full h-auto object-cover"
            />
            <img 
              src={getCloudinaryUrl('/assets/About/Hero Section/Main_mobile.webp')} 
              alt="Korzi RC Machines" 
              className="md:hidden w-full h-auto object-cover"
            />

            {/* DragonFly Badge - Mobile */}
            <div className="absolute md:hidden -right-[5%] -top-[5%] w-[120px] h-[120px]">
              <img 
                src={getCloudinaryUrl('/assets/About/Hero Section/DragonFly.webp')} 
                alt="Korzi DragonFly" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* DragonFly Badge - Desktop */}
            <div className="hidden md:block absolute md:-right-[12%] md:-top-[12%] lg:-right-[8%] lg:-top-[10%] md:w-[180px] md:h-[180px] lg:w-[240px] lg:h-[240px]">
              <img 
                src={getCloudinaryUrl('/assets/About/Hero Section/DragonFly.webp')} 
                alt="Korzi DragonFly" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Bottom Right Text - Desktop only, beside image */}
          <div className="hidden md:block md:max-w-[180px] lg:max-w-[280px] flex-shrink-0 pb-8 lg:pb-12">
            <p 
              className="text-white text-xs lg:text-[16px] lg:leading-[24px]"
              style={{ 
                fontFamily: 'DM Sans'
              }}
            >
              We build real RC machines that are strong, responsive, and made for everyday chaos driveways, dirt, terraces, parks, anywhere motion belongs. From design to assembly, every Korzi machine carries the same promise
            </p>
          </div>
        </div>

        {/* Mobile Text - Below image */}
        <div className="md:hidden mt-4">
          <p 
            className="text-white text-[15px]"
            style={{ 
              fontFamily: 'DM Sans',
              lineHeight: '1.5'
            }}
          >
            We build real RC machines that are strong, responsive, and made for everyday chaos driveways, dirt, terraces, parks, anywhere motion belongs. From design to assembly, every Korzi machine carries the same promise
          </p>
        </div>
      </div>
    </section>
  );
}
