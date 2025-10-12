import  { useState, useEffect } from 'react';
import VideoCard from '../ui/VideoCard';

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const calculateCardsToShow = () => {
      const screenWidth = window.innerWidth;
      const cardWidth = 230; // 216px card + 14px gap
      const calculatedCards = Math.floor(screenWidth / cardWidth);
      setCardsToShow(Math.max(1, Math.min(calculatedCards, 8))); // Min 1, Max 8 (total cards)
    };

    calculateCardsToShow();
    window.addEventListener('resize', calculateCardsToShow);
    
    return () => window.removeEventListener('resize', calculateCardsToShow);
  }, []);

  const carouselData = [
    {
      id: 1,
      image: "/image.png",
      overlayText: "hyrox",
      title: "RC Car Racing Championship",
      originalPrice: "INR 2999",
      discountedPrice: "INR 2699",
      discount: "7% off",
      views: "1.2K Views"
    },
    {
      id: 2,
      image: "/image.png",
      overlayText: "THAT MEANS A LOT TO ME!",
      title: "Drone Aerial Photography",
      originalPrice: "INR 3999",
      discountedPrice: "INR 3499",
      discount: "12% off",
      views: "856 Views"
    },
    {
      id: 3,
      image: "/image.png",
      overlayText: "SOMETHING HEALTHY!",
      title: "Robotics Building Kit",
      originalPrice: "INR 4999",
      discountedPrice: "INR 4299",
      discount: "14% off",
      views: "2.1K Views"
    },
    {
      id: 4,
      image: "/image.png",
      overlayText: "",
      title: "KORZI PRO Package",
      originalPrice: "INR 6999",
      discountedPrice: "INR 5999",
      discount: "15% off",
      views: "3.5K Views"
    },
    {
      id: 5,
      image: "/image.png",
      overlayText: "COMPLETE TECH PROFILE",
      title: "Complete RC Starter Kit",
      originalPrice: "INR 8999",
      discountedPrice: "INR 7499",
      discount: "17% off",
      views: "4.2K Views"
    },
    {
      id: 6,
      image: "/image.png",
      overlayText: "A FEW CLICKS",
      title: "Remote Control Accessories",
      originalPrice: "INR 1999",
      discountedPrice: "INR 1699",
      discount: "15% off",
      views: "1.8K Views"
    },
    {
      id: 7,
      image: "/image.png",
      overlayText: "WHICH YOU WOULD",
      title: "Drone Racing Simulator",
      originalPrice: "INR 2999",
      discountedPrice: "INR 2499",
      discount: "17% off",
      views: "2.7K Views"
    },
    {
      id: 8,
      image: "/image.png",
      overlayText: "THAT KORZI HAS",
      title: "Advanced Robotics Kit",
      originalPrice: "INR 5999",
      discountedPrice: "INR 4999",
      discount: "17% off",
      views: "3.1K Views"
    }
  ];

  const nextSlide = () => {
    if (currentIndex < carouselData.length - cardsToShow) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full bg-[var(--background)] py-12">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--primary)] uppercase tracking-wide">
          WATCH KORZI TAKE OVER
        </h1>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full px-4">
        {/* Navigation Arrow - Previous */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3 transition-colors duration-200 ${
            currentIndex === 0 
              ? 'bg-[var(--text-secondary)] text-[var(--text-secondary)] cursor-not-allowed' 
              : 'bg-[var(--background)] hover:bg-[var(--text-secondary)] text-[var(--foreground)] border border-[var(--border)]'
          }`}
          aria-label="Previous videos"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation Arrow - Next */}
        <button
          onClick={nextSlide}
          disabled={currentIndex >= carouselData.length - cardsToShow}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3 transition-colors duration-200 ${
            currentIndex >= carouselData.length - cardsToShow
              ? 'bg-[var(--text-secondary)] text-[var(--text-secondary)] cursor-not-allowed' 
              : 'bg-[var(--background)] hover:bg-[var(--text-secondary)] text-[var(--foreground)] border border-[var(--border)]'
          }`}
          aria-label="Next videos"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cards Horizontal */}
        <div className="flex justify-center w-full overflow-hidden">
          <div 
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 230}px)`,
              width: `${cardsToShow * 230 - 14}px`
            }}
          >
            {carouselData.map((item) => (
              <VideoCard
                key={item.id}
                id={item.id}
                image={item.image}
                overlayText={item.overlayText}
                title={item.title}
                originalPrice={item.originalPrice}
                discountedPrice={item.discountedPrice}
                discount={item.discount}
                views={item.views}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}