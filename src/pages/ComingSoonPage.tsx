import { MoveRight } from 'lucide-react';
import { useState, useEffect } from 'react';


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
    <div className="min-h-screen  bg-[#000] text-[var(--foreground)] relative overflow-hidden">
      {/* Desktop Layout (lg and above) */}
      <div className="hidden lg:block">
        {/* KORZI Logo */}
        <div className="absolute top-12 left-8 z-10 transition-all duration-300 ease-in-out" style={{
          left: 'var(--sidebar-width, 2rem)'
        }}>
          <img 
            src="/logo-horizontal.png" 
            alt="KORZI" 
            className="h-24 3xl:h-[8rem] w-auto"
          />
        </div>

        {/* GIF in top-right corner */}
        <div className="w-full ml-[63%] z-10 transition-all duration-300 ease-in-out" style={{
          right: 'var(--sidebar-width, 3rem)'
        }}>
          <img
            src="/coming-soon.gif"
            alt="Coming Soon Animation"
            className="w-120 h-120 3xl:w-[40rem] 3xl:h-[40rem] object-cover -rotate-[6deg] -z-10"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col bottom-0 relative justify-center -mt-32 3xl:pt-[35rem] px-8 sm:px-12 3xl:px-32">
          {/* Main Heading */}
          <div className="mb-8">
              <h2 className="leading-tight mb-6 font-heading">
                <span className="[transform:scaleY(1.3)] text-[var(--primary)] font-black block text-8xl 3xl:text-[8rem] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Machines</span>
                <span className="[transform:scaleY(1.3)] block text-5xl md:text-8xl 3xl:text-[8rem] text-[var(--foreground)] mt-4 animate-in fade-in duration-1000 delay-300 font-black" style={{ fontFamily: 'Inter, sans-serif' }}>
              For The <span className="underline decoration-7 underline-offset-[12px]" >Young&nbsp; </span>
            </span>
              </h2>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-6 3xl:gap-6 items-center flex-wrap">
            {/* Grip. Guts. Glory Button */}
            <button className="border-2 border-white px-24 py-6 text-xl 3xl:text-3xl 3xl:px-32 3xl:py-8 font-medium bg-black text-white transition-all duration-300 tracking-wide rounded-none font-body">Grip. Guts. Glory
            </button>

            {/* Arrow Button with Text */}
            <button className="border-2 border-white px-9 py-4 text-xl 3xl:text-2xl 3xl:px-12 3xl:py-6 font-medium  transition-all duration-300 flex items-center gap-4 3xl:gap-6 rounded-none  text-black font-body">
              <MoveRight
    color="white" 
    className="w-24 h-10 3xl:w-24 3xl:h-12 flex-shrink-0 mr-10" 
  />
              <span className="bg-white px-6 py-2 3xl:px-8 3xl:py-3 rounded-md"
                   >Soon on Amazon and korzi.toys
              </span>
            </button>

            {/* Timer Button with Countdown */}
            <button className="border-2 border-white px-16 py-6 text-xl 3xl:text-2xl 3xl:px-12 3xl:py-8 font-medium transition-all duration-300 tracking-wide rounded-none font-body">
              <span className='text-black bg-white py-4 px-16 3xl:py-6 3xl:px-20 rounded-md'>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Logo Section */}
        <div className="flex justify-center py-4 sm:py-6">
          <img 
            src="/logo-horizontal.png" 
            alt="KORZI" 
            className="h-14 sm:h-20 md:h-20 w-auto object-contain"
          />
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex flex-col justify-start p-4 sm:p-6 md:p-8 bg-black pb-8">
          {/* Main Heading */}
          <div className="mb-8 text-center bg-black">
            <h2 className="leading-tight mb-6 font-heading">
              <span className="text-[var(--primary)] block text-5xl sm:text-6xl md:text-7xl mb-2 font-black text-left [transform:scaleY(1.3)]" style={{ fontFamily: 'Inter, sans-serif' }}>Machines</span>
              <span className="text-5xl text-left sm:text-6xl md:text-7xl font-black text-[var(--foreground)] mt-4 animate-in fade-in duration-1000 delay-300 block [transform:scaleY(1.3)]" style={{ fontFamily: 'Inter, sans-serif' }}>
              For The <span className="underline decoration-4 underline-offset-4 inline-block ">Young&nbsp;</span>
            </span>
            </h2>
          </div>

          {/* GIF Section - Now at the bottom */}
        <div className="flex sm:justify-center">
          <img
            src="/coming-soon.gif"
            alt="Coming Soon Animation"
            className="w-full bg-transparent h-72 sm:w-96 sm:h-80 md:w-96 md:h-96 object-cover shadow-2xl -rotate-[6deg]"
          />
        </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col gap-4 items-center z-10">
            {/* Grip. Guts. Glory Button */}
            <button className="border-2 border-white px-6 py-[38px] sm:px-8 text-lg sm:text-xl font-medium bg-black text-white transition-all duration-300 tracking-wide w-full max-w-sm rounded-none text-center font-body">
              Grip. Guts. Glory
            </button>

            {/* Arrow Button with Text */}
            <button className="border-2 border-white px-6 py-4 sm:px-8 text-lg sm:text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 w-full max-w-sm rounded-none text-black text-left font-body">
              <div className="bg-white px-8 py-2 rounded-md text-center">
                Soon on Amazon and korzi.toys
              </div>
            </button>

            {/* Timer Button with Countdown */}
            <button className="border-2 border-white px-6 py-4 sm:px-8 text-lg sm:text-xl font-medium transition-all duration-300 tracking-wide w-full max-w-sm rounded-none text-center font-body">
              <div className='text-black w-full bg-white py-6 px-16 rounded-md text-center'>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}