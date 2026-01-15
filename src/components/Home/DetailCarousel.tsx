import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';

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
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
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
      buttonText: "SHOP NOW",
      buttonLink: "/shop",
      image: "/assets/homepage/Parentkid.png"
    }
  ];

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Reset to first slide when entering view
        if (entry.isIntersecting) {
          setCurrentSlide(0);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play timer - only when in view and not hovered
  useEffect(() => {
    if (!isInView || isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length, isHovered, isInView, currentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);


  return (
    <section ref={sectionRef} className="relative bg-black py-4 md:py-16 min-h-[600px] md:min-h-[500px]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        {/* Navigation Controls - Outside Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="hidden md:block absolute -left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-2 md:p-3 transition-colors z-30 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
          </button>
          
          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="hidden md:block absolute -right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-2 md:p-3 transition-colors z-30 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
          </button>

        {/* Carousel Card Container */}
        <div className="relative bg-black border border-gray-700 overflow-visible z-10 h-[600px] md:h-[500px]">
          {/* Slides Container */}
          <div className="relative h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-opacity duration-500 h-full ${
                  index === currentSlide ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
                }`}
              >
                {/* Slide Content Grid */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:h-full overflow-visible">
                  {/* Image Section - First on Mobile */}
                  <div className="relative bg-gray-800 lg:order-2 h-[250px] lg:h-full">
                    <img 
                      src={getCloudinaryUrl(slide.image)} 
                      alt={slide.title}
                      className="relative w-full h-full object-cover z-20"
                      loading="lazy"
                    />
                    <button
  onClick={prevSlide}
  aria-label="Previous slide"
  className="
    absolute
    -left-3
    -bottom-2.5
    p-2
    bg-gray-800
    hover:bg-[#02FF00]
    flex items-center justify-center
    z-30
    transition-colors
    group
    lg:hidden
  "
>
  <ChevronLeft className="w-5 h-5 text-white group-hover:text-black transition-colors" />
</button>
<button
  onClick={nextSlide}
  aria-label="Next slide"
  className="
    absolute
    -right-3
    -bottom-2.5
    p-2
    bg-gray-800
    hover:bg-[#02FF00]
    flex items-center justify-center
    z-30
    transition-colors
    group
    lg:hidden
  "
>
  <ChevronRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
</button>
                  </div>

                  {/* Content Section - Second on Mobile */}
                  <div className="bg-gray p-6 md:p-12 lg:p-16 flex flex-col justify-between lg:order-1 flex-1">
                    {/* Text Content */}
                    <div className="space-y-3 md:space-y-6">
                      <h2 
                        className="text-white uppercase text-xl md:text-[48px] leading-tight md:leading-[56px]"
                        style={{
                          fontFamily: 'Bebas Neue',
                        }}
                      >
                        {slide.title}
                      </h2>
                      <p 
                        className="text-white text-xs md:text-base leading-relaxed"
                        style={{
                          fontFamily: 'DM Sans',
                        }}
                      >
                        {slide.description}
                      </p>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-2 md:mt-4">
                      <button 
                        onClick={() => navigate(slide.buttonLink)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="px-4 py-2 md:px-6 md:py-4 flex items-center gap-3 md:gap-4 border-l-4 border-[#02FF00] relative overflow-hidden group bg-[#3A3A3A] text-white cursor-pointer text-xs md:text-sm"
                        style={{
                          fontFamily: 'DM Sans',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                        <span className="relative z-20 group-hover:text-black transition-colors duration-300">{slide.buttonText}</span>
                        <ArrowUpRight className="relative z-10 w-3 h-3 md:w-5 md:h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {/* Removed - now outside container */}
        </div>
        </div>
      </div>
    </section>
  );
}