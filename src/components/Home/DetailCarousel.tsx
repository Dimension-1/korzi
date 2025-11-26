import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export default function DetailCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const slides: Slide[] = [
    {
      id: 1,
      title: "POWER MEETS PRECISION",
      description: "4WD control, high-torque motor, and balanced suspension that delivers pure motion → from streets to dirt tracks.",
      buttonText: "SHOP NOW",
      buttonLink: "/shop",
      image: "/assets/homepage/powermeetsprecision.png"
    },
    {
      id: 2,
      title: "CRASH-TESTED TOUGHNESS.",
      description: "Made to drift, jump, and survive impact. Korzi machines are built to handle chaos, not sit on shelves. Up to 25 km/h of tight control and instant response. It's not playtime, it's performance time.",
      buttonText: "EXPLORE APEX DRIVE K-01",
      buttonLink: "/shop",
      image: "/assets/homepage/crashed_test.png"
    },
    {
      id: 3,
      title: "BIS CERTIFIED FOR EVERY RACER.",
      description: "Built strong, engineered safe. Korzi machines meet Indian safety standards and global durability benchmarks.",
      buttonText: "SHOP NOW",
      buttonLink: "/shop",
      image: "/assets/homepage/BIScar.png"
    },
    {
      id: 4,
      title: "MACHINES MADE TO BRING PEOPLE TOGETHER.",
      description: "From kids discovering their first RC to grown-ups reliving the rush. Korzi is where control meets connection. Drive, race, or build. You're part of the Crew.",
      buttonText: "JOIN THE KORZI CREW",
      buttonLink: "/crew",
      image: "/assets/homepage/Parentkid.png"
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  return (
    <section className="relative bg-black py-16">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-8 relative z-10">
        {/* Carousel Card Container */}
        <div className="relative bg-black border border-gray-700 overflow-hidden z-10">
          {/* Slides Container */}
          <div className="relative">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
                }`}
              >
                {/* Slide Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                  {/* Left: Content Section */}
                  <div className="bg-gray p-12 lg:p-16 flex flex-col justify-between">
                    {/* Text Content */}
                    <div className="space-y-6">
                      <h2 
                        className="text-white uppercase"
                        style={{
                          fontFamily: 'Bebas Neue',
                          fontSize: '48px',
                          lineHeight: '56px',
                        }}
                      >
                        {slide.title}
                      </h2>
                      <p 
                        className="text-white"
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '16px',
                          lineHeight: '24px',
                        }}
                      >
                        {slide.description}
                      </p>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-8">
                      <button 
                        onClick={() => navigate(slide.buttonLink)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="px-6 py-4 flex items-center gap-3 border-l-4 border-[#02FF00] relative overflow-hidden group bg-[#3A3A3A] text-white cursor-pointer"
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                        <span className="relative z-20 group-hover:text-black transition-colors duration-300">{slide.buttonText}</span>
                        <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Image Section */}
                  <div className="relative bg-gray-800">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-3 transition-colors z-30 pointer-events-auto"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#02FF00] hover:bg-[#00DD00] p-3 transition-colors z-30 pointer-events-auto"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 pointer-events-auto">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-[#02FF00]' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}