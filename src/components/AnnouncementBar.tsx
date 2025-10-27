
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Announcement {
  id: string;
  text: string;
  link?: string;
}

const announcements: Announcement[] = [
  {
    id: 'announcement_1',
    text: '10% off on all orders over Rs. 1499',
    link: ''
  },
  {
    id: 'announcement_2', 
    text: '15% off on all orders over Rs. 4999',
    link: ''
  }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Auto-rotate announcements every 4 seconds
  useEffect(() => {
    if (!isAutoRotating || announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const goToPrevious = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentAnnouncement = announcements[currentIndex];

  if (announcements.length === 0) return null;

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-center">
        {announcements.length === 1 ? (
          // Single announcement
          <div className="text-center">
            {currentAnnouncement.link ? (
              <a 
                href={currentAnnouncement.link}
                className="text-[var(--background)] hover:text-[var(--surface)] transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="font-body text-xs sm:text-sm md:text-base">{currentAnnouncement.text}</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <span className="font-medium text-xs sm:text-sm md:text-base">{currentAnnouncement.text}</span>
            )}
          </div>
        ) : (
          // Multiple announcements with carousel
          <div className="flex items-center justify-center w-full">
            {/* Previous button */}
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            {/* Announcement content with sliding carousel */}
            <div className="text-center px-6 sm:px-12 relative overflow-hidden w-full flex items-center justify-center">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${announcements.length * 100}%`
                }}
              >
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id}
                    className="flex-shrink-0 flex items-center justify-center w-full"
                    style={{ width: '100%' }}
                  >
                    {announcement.link ? (
                      <a 
                        href={announcement.link}
                        className="text-[var(--background)] hover:text-[var(--surface)] transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
                      >
                        <span className="font-body text-xs sm:text-sm md:text-base">{announcement.text}</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    ) : (
                      <span className="font-medium text-xs sm:text-sm md:text-base">{announcement.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
