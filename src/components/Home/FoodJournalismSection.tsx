import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselCard {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  overlayText?: string;
  cardType: 'newsletter' | 'academy' | 'dictionary';
}

export default function FoodJournalismSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData: CarouselCard[] = [
    {
      id: 1,
      title: "Truth Be Told",
      description: "India's top health newsletter. Read by 50,000+.",
      backgroundImage: "/image.png", // You can replace with actual images
      overlayText: "Truth Be Told",
      cardType: 'newsletter'
    },
    {
      id: 2,
      title: "The Whole Truth Academy",
      description: "The food & nutrition course we should've been taught in school.",
      backgroundImage: "/image.png",
      overlayText: "Is bread good for your health?",
      cardType: 'academy'
    },
    {
      id: 3,
      title: "ChemX",
      description: "Found an ingredient you can't pronounce? Allow us to help.",
      backgroundImage: "/image.png",
      overlayText: "Chemical x Dictionary",
      cardType: 'dictionary'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= carouselData.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? carouselData.length - 3 : prevIndex - 1
    );
  };

  const getCardBackground = (cardType: string) => {
    switch (cardType) {
      case 'newsletter':
        return 'bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/30';
      case 'academy':
        return 'bg-gradient-to-br from-[var(--background)] to-[var(--background)]';
      case 'dictionary':
        return 'bg-gradient-to-br from-[var(--background)] to-[var(--background)]';
      default:
        return 'bg-[var(--background)]';
    }
  };

  const getCardContent = (card: CarouselCard) => {
    switch (card.cardType) {
      case 'newsletter':
        return (
          <div className="relative h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="mb-8">
                {/* Blindfolded people illustration - Canva style */}
                <div className="flex justify-center space-x-8">
                  {/* Person 1 - Green blindfold */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mb-3" style={{
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                    }}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-green-400 rounded-full mb-2" style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
                    }}></div>
                    <div className="w-16 h-3 bg-gray-300 rounded-full" style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
                    }}></div>
                  </div>
                  
                  {/* Person 2 - Orange blindfold */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center mb-3" style={{
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                    }}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 bg-orange-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-orange-400 rounded-full mb-2" style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
                    }}></div>
                    <div className="w-16 h-3 bg-gray-300 rounded-full" style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
                    }}></div>
                  </div>
                  
                  {/* Person 3 - Purple blindfold */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-purple-400 rounded-full flex items-center justify-center mb-3" style={{
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                    }}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 bg-purple-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-purple-400 rounded-full mb-2" style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
                    }}></div>
                    <div className="w-16 h-3 bg-gray-300 rounded-full" style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
                    }}></div>
                  </div>
                </div>
              </div>
              <h3 className="text-white text-3xl font-heading" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>{card.overlayText}</h3>
            </div>
          </div>
        );
      
      case 'academy':
        return (
          <div className="relative h-full p-6">
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Left side - Bread and ingredients */}
              <div className="flex flex-col justify-center">
                <div className="bg-[var(--background)]/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-20 h-8 bg-[var(--primary)]/30 rounded"></div>
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full ml-2"></div>
                    <div className="w-2 h-2 bg-[var(--secondary)] rounded-full ml-1"></div>
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full ml-1"></div>
                  </div>
                  <div className="text-xs text-[var(--foreground)] font-body">Ingredients</div>
                </div>
              </div>
              
              {/* Right side - Video */}
              <div className="flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-[var(--background)]/50 rounded-full mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[var(--background)]/70 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-[var(--background)]/90 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-[var(--primary)]/80 rounded-full p-3 hover:bg-[var(--primary)] transition-colors">
                  <svg className="w-8 h-8 text-[var(--background)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Question overlay */}
            <div className="absolute top-6 left-6 right-6">
              <p className="text-[var(--foreground)] text-lg font-heading drop-shadow-lg">{card.overlayText}</p>
            </div>
            
            {/* Academy logo */}
            <div className="absolute top-4 right-4">
              <div className="bg-[var(--background)]/50 rounded px-2 py-1">
                <span className="text-[var(--foreground)] text-xs font-body">The Whole Truth Academy</span>
              </div>
            </div>
          </div>
        );
      
      case 'dictionary':
        return (
          <div className="relative h-full p-8">
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-white text-3xl font-heading mb-6" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>{card.overlayText}</h3>
              <p className="text-white/90 text-base mb-8 leading-relaxed">{card.description}</p>
              
              {/* Search bar */}
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm" style={{
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
              }}>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder='Search for "Palm Oil"'
                    className="bg-transparent text-white placeholder-white/70 text-base flex-1 outline-none"
                  />
                  <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[var(--background)] py-12 md:py-16 px-4 lg:px-8">
      {/* Upper Section - Informational */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-[var(--foreground)] leading-tight" style={{
              letterSpacing: '-0.02em'
            }}>
              We're also fixing food journalism.
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed font-body" style={{
              lineHeight: '1.6'
            }}>
              We can't fix food without fixing food journalism. Because what you read and believe is what you eat and repeat. We're on it.
            </p>
          </div>

          {/* Right Side - Venn Diagram */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              {/* Venn Diagram - SVG for proper intersection */}
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                <svg width="100%" height="100%" viewBox="0 0 500 500" className="absolute inset-0" style={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                }}>
                  {/* Left Circle */}
                  <circle cx="125" cy="250" r="120" fill="none" stroke="var(--primary)" strokeWidth="4"/>
                  
                  {/* Right Circle */}
                  <circle cx="375" cy="250" r="120" fill="none" stroke="var(--primary)" strokeWidth="4"/>
                  
                  {/* Intersection Area */}
                  <defs>
                    <clipPath id="leftCircle">
                      <circle cx="125" cy="250" r="120"/>
                    </clipPath>
                    <clipPath id="rightCircle">
                      <circle cx="375" cy="250" r="120"/>
                    </clipPath>
                  </defs>
                  
                  {/* Fill intersection */}
                  <circle cx="125" cy="250" r="120" fill="var(--primary)" clipPath="url(#rightCircle)"/>
                </svg>
                
                {/* Labels - Hand-written style */}
                <div className="absolute left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 text-[var(--primary)] font-heading text-sm md:text-base lg:text-lg" style={{
                  transform: 'rotate(-5deg)'
                }}>
                  What you eat
                </div>
                <div className="absolute right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 text-[var(--primary)] font-heading text-sm md:text-base lg:text-lg" style={{
                  transform: 'rotate(5deg)'
                }}>
                  What you know
                </div>
                
                {/* Arrow - Hand-drawn style */}
                <div className="absolute top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2">
                  <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[var(--primary)]" fill="currentColor" viewBox="0 0 24 24" style={{
                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
                    transform: 'rotate(-10deg)'
                  }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="absolute top-16 md:top-20 lg:top-28 left-1/2 transform -translate-x-1/2 text-[var(--primary)] text-xs md:text-sm lg:text-base font-heading text-center" style={{
                  lineHeight: '1.2'
                }}>
                  We're working on<br/>closing the gap
                </div>
                
                {/* Barry Character - Hand-drawn style */}
                <div className="absolute -right-8 md:-right-12 lg:-right-16 top-1/2 transform -translate-y-1/2">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[var(--primary)] rounded-full flex items-center justify-center" style={{
                      filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.2))',
                      transform: 'rotate(15deg)'
                    }}>
                      <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[var(--foreground)] rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[var(--primary)] rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-6 md:-bottom-8 lg:-bottom-10 left-1/2 transform -translate-x-1/2 text-[var(--primary)] text-xs md:text-sm lg:text-base font-heading" style={{
                      transform: 'rotate(-5deg)'
                    }}>
                      Barry!
                    </div>
                    <div className="absolute top-1/2 -left-8 md:-left-10 lg:-left-12 transform -translate-y-1/2">
                      <svg className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[var(--primary)]" fill="currentColor" viewBox="0 0 24 24" style={{
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
                        transform: 'rotate(10deg)'
                      }}>
                        <path d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Carousel */}
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 p-2 rounded-full bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 p-2 rounded-full bg-[var(--secondary)] text-[var(--background)] hover:bg-[var(--primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {carouselData.map((card) => (
                <div key={card.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 md:px-4">
                  <div className={`${getCardBackground(card.cardType)} rounded-2xl h-64 md:h-80 overflow-hidden relative`}>
                    {getCardContent(card)}
                  </div>
                  
                  {/* Card Info Below */}
                  <div className="mt-4 md:mt-6 text-center">
                    <h3 className="text-lg md:text-xl font-heading text-[var(--foreground)] mb-2">{card.title}</h3>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-sm md:text-base text-[var(--text-secondary)] font-body">{card.description}</p>
                      <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}