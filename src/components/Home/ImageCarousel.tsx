import  { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  features: string[];
  ctaText: string;
  testimonial?: {
    rating: number;
    quote: string;
    review: string;
    author: string;
  };
}

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData: CarouselSlide[] = [
    {
      id: 1,
      image: "/image.png",
      title: "In-Vivo Tested Sunscreens",
      features: [
        "Protects from both UV-A & UV-B",
        "Formulated for all skin types"
      ],
      ctaText: "Shop Now",
      testimonial: {
        rating: 5,
        quote: "Effective and very light",
        review: "I really like the sunscreen. I never use before as I was scared of pore blocking. But this sunscreen really good",
        author: "Priya S., Verified Buyer"
      }
    },
    {
      id: 2,
      image: "/image.png",
      title: "Advanced RC Technology",
      subtitle: "For the Young Innovators",
      features: [
        "High-performance motors",
        "Durable construction"
      ],
      ctaText: "Explore Now",
      testimonial: {
        rating: 5,
        quote: "Amazing performance!",
        review: "My kids love this RC car. The build quality is excellent and it's really fast. Highly recommended!",
        author: "Raj K., Verified Buyer"
      }
    },
    {
      id: 3,
      image: "/image.png",
      title: "Professional Drone Systems",
      subtitle: "Capture the World",
      features: [
        "4K video recording",
        "GPS navigation system"
      ],
      ctaText: "Learn More",
      testimonial: {
        rating: 5,
        quote: "Incredible aerial shots",
        review: "This drone has transformed my photography. The stability and image quality are outstanding.",
        author: "Sarah M., Professional Photographer"
      }
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };


  const currentSlide = carouselData[currentIndex];

  return (
    <div className="w-full relative overflow-hidden">
      {/* Main Carousel Container */}
      <div className="relative w-full h-[600px] lg:h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Section - Text Content */}
              <div className="text-white space-y-6">
                {/* Title */}
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  {currentSlide.title}
                </h1>

                {/* Subtitle */}
                {currentSlide.subtitle && (
                  <p className="text-xl lg:text-2xl text-gray-200">
                    {currentSlide.subtitle}
                  </p>
                )}

                {/* Features List */}
                <div className="space-y-3">
                  {currentSlide.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span className="text-lg lg:text-xl">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
                    {currentSlide.ctaText}
                  </button>
                </div>

                {/* Testimonial */}
                {currentSlide.testimonial && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(currentSlide.testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-lg font-semibold mb-2">
                      "{currentSlide.testimonial.quote}"
                    </blockquote>
                    <p className="text-gray-200 mb-3">
                      {currentSlide.testimonial.review}
                    </p>
                    <cite className="text-sm text-gray-300">
                      — {currentSlide.testimonial.author}
                    </cite>
                  </div>
                )}
              </div>

              {/* Right Section - Product Images */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Product mockup or additional content can go here */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
                    <div className="text-white text-lg font-medium">
                      Featured Products
                    </div>
                    <div className="mt-4 text-gray-200">
                      Discover our latest innovations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-[var(--secondary)] text-[var(--background)] hover:bg-[var(--primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}