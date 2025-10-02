
'use client';

import { useState, useEffect } from 'react';

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (you can adjust this)
    const targetDate = new Date('2025-12-31T23:59:59').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden p-20">
      {/* KORZI Logo */}
      <div className="absolute top-0 left-8 z-10">
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
          className="w-120 h-120 object-cover rounded-full shadow-2xl"
        >
          <source src="/WhatsApp Video 2025-10-02 at 00.37.35_39db58e1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center h-screen px-12">
        {/* Main Heading */}
        <div className="mb-4">
            <h2 className="leading-tight mb-6 body-font">
              <span className="text-[#02FF00] block text-8xl mb-2">Machines</span>
              <span className="text-white block text-7xl">
                For The <span className="relative">Young
                  <div className="absolute bottom-2 left-0 w-full h-2 bg-white"></div>
                </span>
              </span>
            </h2>
        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-6 items-center flex-wrap">
          {/* Grip. Guts. Glory Button */}
          <button className="border-2 border-white px-10 py-5 text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 body-font tracking-wide">
            Grip. Guts. Glory
          </button>

          {/* Arrow Button with Text */}
          <button className="border-2 border-white px-10 py-5 text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-4 body-font">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Soon on Amazon and korzi.toys
          </button>

          {/* Timer Button */}
          <button className="border-2 border-white px-10 py-5 text-xl font-medium hover:bg-white hover:text-black transition-all duration-300 body-font tracking-wide">
            Timer
          </button>
        </div>
      </div>

    </div>
  );
}