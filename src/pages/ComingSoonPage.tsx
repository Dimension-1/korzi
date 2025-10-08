import { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to exactly 44 days from October 2, 2024 (today)
    const targetDate = new Date('2025-10-02T00:00:00').getTime() + (44 * 24 * 60 * 60 * 1000);

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const difference = targetDate - currentTime;
      console.log(difference);
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    console.log(timeLeft);
    // Update immediately
    updateTimer();

    // Set up interval
    const timer = setInterval(updateTimer, 1000);

    // Handle visibility change to prevent pausing
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <AppLayout>
      {/* Desktop Layout (lg and above) */}
      <div className="hidden lg:block">
        {/* KORZI Logo */}
        <div className="absolute top-8 left-8 z-10">
          <img 
            src="/logo-horizontal.png" 
            alt="KORZI" 
            className="h-40 w-auto"
          />
        </div>

        {/* Video in top-right corner */}
        <div className="absolute top-0 right-12 z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            className="w-120 h-120 object-cover rounded-full shadow-2xl"
          >
            <source src="/korzi-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center pt-60 px-12">
          {/* Main Heading */}
          <div className="mb-4">
              <h2 className="leading-tight mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[var(--primary)] block text-8xl mb-2">Machines</span>
                <span className="block text-5xl md:text-8xl font-black text-[var(--foreground)] mt-4 animate-in fade-in duration-1000 delay-300">
              For The <span className="underline decoration-7 underline-offset-[12px]">Young</span>
            </span>
              </h2>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-6 items-center flex-wrap">
            {/* Grip. Guts. Glory Button */}
            <button className="border-2 border-white px-12 py-6 text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-wide rounded-none" style={{ fontFamily: 'Inter, sans-serif' }}>
              Grip. Guts. Glory
            </button>

            {/* Arrow Button with Text */}
            <button className="border-2 border-white px-8 py-6 text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-4 rounded-none bg-white text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
              <svg className="w-8 h-8 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Soon on Amazon and korzi.toys
            </button>

            {/* Timer Button with Countdown */}
            <button className="border-2 border-white px-12 py-6 text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-wide rounded-none" style={{ fontFamily: 'Inter, sans-serif' }}>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Logo Section */}
        <div className="flex justify-center py:2 sm:py-6">
          <img 
            src="/logo-horizontal.png" 
            alt="KORZI" 
            className="h-24 sm:h-28 md:h-32 w-auto"
          />
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex flex-col justify-center p-4 sm:p-8">
          {/* Main Heading */}
          <div className="mb-8 text-center">
            <h2 className="leading-tight mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="text-[var(--primary)] block text-4xl sm:text-5xl md:text-6xl mb-2" >Machines</span>
              <span className="block text-5xl md:text-8xl font-black text-[var(--foreground)] mt-4 animate-in fade-in duration-1000 delay-300">
              For The <span className="underline decoration-5 underline-offset-8 ">Young</span>
            </span>
            </h2>
          </div>

          {/* Video Section - Now at the bottom */}
        <div className="flex justify-center py-2 sm:py-6">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-full shadow-2xl"
          >
            <source src="/korzi-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col gap-4 items-center">
            {/* Grip. Guts. Glory Button */}
            <button className="border-2 border-white px-6 py-4 sm:px-8 sm:py-5 text-lg sm:text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-wide w-full max-w-sm rounded-none" style={{ fontFamily: 'Inter, sans-serif' }}>
              Grip. Guts. Glory
            </button>

            {/* Arrow Button with Text */}
            <button className="border-2 border-white px-6 py-4 sm:px-8 sm:py-5 text-lg sm:text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 w-full max-w-sm rounded-none bg-white text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="text-center">Soon on Amazon and korzi.toys</span>
            </button>

            {/* Timer Button with Countdown */}
            <button className="border-2 border-white px-6 py-4 sm:px-8 sm:py-5 text-lg sm:text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 tracking-wide w-full max-w-sm rounded-none" style={{ fontFamily: 'Inter, sans-serif' }}>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}