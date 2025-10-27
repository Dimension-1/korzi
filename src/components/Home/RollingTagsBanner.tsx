import React from 'react';

const RollingTagsBanner: React.FC = () => {
  const tags = [
    'BUILT FOR SPEED',
    'HIGH PERFORMANCE',
    'DURABLE DESIGN',
    'PRECISE CONTROL',
    'REAL MACHINES',
    'ENTRY LEVEL',
    'FOR HOBBYISTS',
    'KID FRIENDLY',
    'RUGGED CONSTRUCTION',
    'PERFECT FOR BEGINNERS',
    'REMOTE CONTROL',
    'REAL PERFORMANCE'
  ];

  return (
    <div className="w-full bg-[var(--primary)] py-3 overflow-hidden">
      {/* Auto-scrolling tags */}
      <div className="relative">
        <div className="flex animate-scroll space-x-6">
          {/* First set */}
          {tags.map((tag, index) => (
            <div key={`first-${index}`} className="flex items-center flex-shrink-0">
              <span className="text-black text-xs sm:text-sm font-body uppercase tracking-wider whitespace-nowrap">
                {tag}
              </span>
              <div className="w-px h-4 bg-black ml-6"></div>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {tags.map((tag, index) => (
            <div key={`second-${index}`} className="flex items-center flex-shrink-0">
              <span className="text-black text-xs sm:text-sm font-body uppercase tracking-wider whitespace-nowrap">
                {tag}
              </span>
              <div className="w-px h-4 bg-black ml-6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RollingTagsBanner;

