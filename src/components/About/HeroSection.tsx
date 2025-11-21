export default function HeroSection() {
  return (
    <section className="bg-black text-white py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16">
      <div className="w-full mx-auto">
        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 md:gap-12 mb-8 md:mb-16">
          {/* Left: Title */}
          <div>
            <h1 
              className="uppercase text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: 'Bebas Neue',
                lineHeight: '1',
                background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              FOR THE LOVE OF MACHINES.
            </h1>
          </div>

          {/* Right: Description */}
          <div className="flex items-center">
            <p 
              className="text-lg md:text-2xl lg:text-3xl"
              style={{ 
                fontFamily: 'DM Sans',
                fontWeight: 200,
                lineHeight: '1.7',
                background: 'radial-gradient(100% 100% at 0% 3.47%, #FFFFFF 0%, #999999 53.79%, #02FF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Korzi is built for people who feel something when things move the ones who like control, speed, balance, and the thrill of driving anything with wheels.
            </p>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="relative">
          {/* Main Image */}
          <div className="w-full max-w-[1024px]">
            <img 
              src="/assets/About/Hero Section/Main.png" 
              alt="Korzi RC Machines" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* DragonFly Badge - Overlapping top-right of image */}
          <div className="absolute right-[10%] -top-[30%] w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[285px] lg:h-[285px]">
            <img 
              src="/assets/About/Hero Section/DragonFly.png" 
              alt="Korzi DragonFly" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Bottom Right Text - Below badge */}
          <div className="absolute bottom-[2%] right-[2%] max-w-[200px] md:max-w-[250px] lg:max-w-[280px]">
            <p 
              className="text-white text-xs md:text-sm"
              style={{ 
                fontFamily: 'DM Sans',
                lineHeight: '1.7'
              }}
            >
              We build real RC machines that are strong, responsive, and made for everyday chaos driveways, dirt, terraces, parks, anywhere motion belongs. From design to assembly, every Korzi machine carries the same promise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
