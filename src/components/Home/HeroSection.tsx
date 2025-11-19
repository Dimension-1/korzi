export default function HeroSection() {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/assets/homepage/KORZI WEBSITE HERO BANNER VIDEO.mp4" type="video/mp4" />
        </video>
  
        {/* Pure Black Overlay */}
        <div className="absolute inset-0 bg-black/40" />
  
        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-black p-6 md:p-8 lg:p-12 z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end gap-8">
            {/* Left Text with Gradient */}
            <div className="flex-shrink-0">
              <h1 
                style={{
                  width: '400px',
                  height: '128px',
                  fontFamily: 'Bebas Neue',
                  fontWeight: 400,
                  fontSize: '64px',
                  lineHeight: '64px',
                  background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                REAL MACHINES.<br />REAL MOTION.
              </h1>
            </div>
  
            {/* Right Text */}
            <div 
              style={{
                width: '900px',
                height: '104px',
                fontFamily: 'DM Sans',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '26px',
                color: '#FFFFFF',
              }}
            >
              <p>
                Korzi builds real machines designed to last, engineered to drift, jump, and win – so every racer (kid or grown-up) feels like a backyard champion. Dirt track, driveway, or terrace : built for chaos, not display.
              </p>
              <p className="text-[#02FF00] mt-2">
                Built for Action. Made to Last.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  