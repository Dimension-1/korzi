import React from 'react';

export default function RealFoodSection() {
  return (
    <div className="w-full bg-[var(--background)] py-16 md:py-24 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            {/* Headline */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-[var(--foreground)] leading-tight" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '900',
              letterSpacing: '-0.04em',
              lineHeight: '1.1'
            }}>
              <span className="relative inline-block mb-4">
                Real food
                <span className="absolute bottom-0 left-0 w-3/4 h-3 bg-[var(--primary)]" style={{
                  borderRadius: '2px'
                }}></span>
              </span>
              <br />
              <span className="relative inline-block">
                made by real people.
                <span className="absolute bottom-0 left-0 w-3/4 h-3 bg-[var(--primary)]" style={{
                  borderRadius: '2px'
                }}></span>
              </span>
            </h2>
            
            {/* Body Text */}
            <p className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              lineHeight: '1.4'
            }}>
              Be it ingredients, process or the people who make it - we literally have #nothingtohide.
            </p>
            
            {/* Postscript */}
            <p className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              lineHeight: '1.4'
            }}>
              PS - Our Barkhana is an ISO certified facility :)
            </p>
          </div>

          {/* Right Side - Image with Interactive Elements */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative overflow-hidden">
              <img
                src="/image.png" // Replace with actual facility image
                alt="Barkhana Food Processing Facility"
                className="w-full h-auto object-cover"
              />
              
              {/* Interactive Hotspots */}
              <div className="absolute top-16 left-16">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200" style={{
                  boxShadow: '0 0 0 6px rgba(69, 214, 44, 0.4)'
                }}>
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="absolute top-32 right-20">
                <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200" style={{
                  boxShadow: '0 0 0 6px rgba(2, 255, 0, 0.4)'
                }}>
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="absolute bottom-24 left-20">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200" style={{
                  boxShadow: '0 0 0 6px rgba(69, 214, 44, 0.4)'
                }}>
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="absolute top-20 right-32">
                <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200" style={{
                  boxShadow: '0 0 0 6px rgba(2, 255, 0, 0.4)'
                }}>
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="absolute bottom-6 right-6">
                <button className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--background)] px-6 py-3 rounded-lg font-medium text-base transition-colors duration-200 flex items-center gap-2" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500',
                  fontStyle: 'italic',
                  borderRadius: '8px'
                }}>
                  Step into the Barkhana
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}