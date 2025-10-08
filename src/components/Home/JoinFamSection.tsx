import React, { useState } from 'react';

export default function JoinFamSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      id: 1,
      title: "Standard errors on removing Instagram from the marketing mix of the newsroom",
      source: "FORBES",
      readTime: "2 MIN READ",
      icon: "F",
      bgColor: "bg-pink-200",
      iconColor: "text-gray-800"
    },
    {
      id: 2,
      title: "TNT on snacks: unhealthy food trends with a social lean",
      source: "THE NEW YORK TIMES",
      readTime: "2 MIN READ",
      icon: "T",
      bgColor: "bg-yellow-200",
      iconColor: "text-red-600"
    },
    {
      id: 3,
      title: "Breaking: Food industry transparency reaches new heights",
      source: "FOOD WEEKLY",
      readTime: "3 MIN READ",
      icon: "F",
      bgColor: "bg-pink-200",
      iconColor: "text-gray-800"
    },
    {
      id: 4,
      title: "The truth about processed foods and consumer awareness",
      source: "NUTRITION TODAY",
      readTime: "4 MIN READ",
      icon: "N",
      bgColor: "bg-yellow-200",
      iconColor: "text-red-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, carouselData.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, carouselData.length - 1)) % Math.max(1, carouselData.length - 1));
  };

  return (
    <div className="w-full bg-[var(--background)] py-12 md:py-16 lg:py-24 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[var(--foreground)] leading-tight" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              lineHeight: '0.9'
            }}>
              Come, join the fam!
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)] font-medium" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              GO TRUTH SEEKERS!
            </p>
            
            {/* Social Media Buttons */}
            <div className="space-y-3 md:space-y-4">
              <button className="w-full max-w-sm border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] px-4 md:px-6 py-3 md:py-4 rounded-lg font-medium text-base md:text-lg transition-colors duration-300 flex items-center justify-between" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                <span className="text-sm md:text-base">Join our Instagram Community</span>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="w-full max-w-sm border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] px-4 md:px-6 py-3 md:py-4 rounded-lg font-medium text-base md:text-lg transition-colors duration-300 flex items-center justify-between" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                <span className="text-sm md:text-base">YouTube</span>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="w-full max-w-sm border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] px-4 md:px-6 py-3 md:py-4 rounded-lg font-medium text-base md:text-lg transition-colors duration-300 flex items-center justify-between" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                <span className="text-sm md:text-base">LinkedIn</span>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Handwritten Text */}
            <div className="mt-6 md:mt-8">
              <p className="text-base md:text-lg lg:text-xl text-[var(--primary)] font-medium" style={{
                fontFamily: 'cursive',
                fontWeight: '500',
                transform: 'rotate(-2deg)'
              }}>
                STOP the PRESS! Print The Looove ❤️
              </p>
            </div>
          </div>

          {/* Right Side - Image and Carousel */}
          <div className="space-y-6 md:space-y-8">
            {/* Person Image */}
            <div className="relative">
              <img
                src="/image.png" // Replace with actual person image
                alt="Person holding package"
                className="w-full h-auto object-cover rounded-xl md:rounded-2xl"
              />
            </div>
            
            {/* Carousel */}
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 50}%)` }}
                >
                  {carouselData.map((item, index) => (
                    <div key={item.id} className="w-1/2 flex-shrink-0 px-1">
                      <div className={`${item.bgColor} rounded-lg p-3 md:p-4 h-32 md:h-40 flex flex-col justify-between`}>
                        {/* Content */}
                        <div className="space-y-1 md:space-y-2">
                          <h3 className="text-xs md:text-sm font-semibold text-gray-800 leading-tight" style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600'
                          }}>
                            {item.title}
                          </h3>
                          
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold ${item.iconColor}`}>
                              {item.icon}
                            </div>
                            <span className="text-xs text-gray-600 font-medium">{item.source}</span>
                            <span className="text-xs text-gray-500">{item.readTime}</span>
                          </div>
                        </div>
                        
                        {/* Small Icon */}
                        <div className="flex justify-end">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-pink-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-pink-200 rounded-full flex items-center justify-center hover:bg-pink-300 transition-colors duration-200"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-pink-200 rounded-full flex items-center justify-center hover:bg-pink-300 transition-colors duration-200"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}