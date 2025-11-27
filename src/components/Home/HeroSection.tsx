import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current) {
        const video = videoRef.current;
        
        // Force play for iOS Safari
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Video autoplay prevented:', error);
          });
        }

        // Ensure video loops on iOS
        const handleVideoEnd = () => {
          video.currentTime = 0;
          video.play();
        };
        
        video.addEventListener('ended', handleVideoEnd);
        
        return () => {
          video.removeEventListener('ended', handleVideoEnd);
        };
      }
    }, []);

    return (
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ pointerEvents: 'none' }}
        >
          <source src="/assets/homepage/KORZI WEBSITE HERO BANNER VIDEO.mp4" type="video/mp4" />
        </video>
  
        {/* Pure Black Overlay */}
        <div className="absolute inset-0 bg-black/40" />
  
        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-black p-4 md:p-8 lg:p-12 z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-end gap-4 md:gap-8 text-center lg:text-left">
            {/* Left Text with Gradient */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <h1 
                className="text-[32px] leading-[36px] md:text-[64px] md:leading-[64px]"
                style={{
                  fontFamily: 'Bebas Neue',
                  fontWeight: 400,
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
              className="w-full lg:w-auto text-sm leading-[20px] md:text-[18px] md:leading-[26px]"
              style={{
                fontFamily: 'DM Sans',
                fontWeight: 400,
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
  