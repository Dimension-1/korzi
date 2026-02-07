import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function ManufacturingSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      name: 'SERVICING',
      image1: '/assets/homepage/services1.png',
      image2: '/assets/homepage/services2.png'
    },
    {
      name: 'ASSEMBLY',
      image1: '/assets/homepage/assembly1.png',
      image2: '/assets/homepage/assembly2.png'
    },
    {
      name: 'TESTING',
      image1: '/assets/homepage/testing1.png',
      image2: '/assets/homepage/testing2.png'
    },
    {
      name: 'PACKING',
      image1: '/assets/homepage/packaging1.png',
      image2: '/assets/homepage/packaging2.png'
    },
    {
      name: 'MANUFACTURING',
      image1: '/assets/homepage/manufacturing1.png',
      image2: '/assets/homepage/manufacturing2.png'
    }
  ];

  return (
    <section className="bg-black py-8 md:py-16 min-h-[600px] md:min-h-[800px]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center">
          {/* Title */}
          <h2 
            className="text-white uppercase mb-3 text-3xl leading-tight"
            style={{
              fontFamily: 'Bebas Neue',
            }}
          >
            REAL MACHINES MADE BY REAL PEOPLE.
          </h2>
          
          {/* Description */}
          <p 
            className="text-white mb-6 text-sm px-4"
            style={{
              fontFamily: 'DM Sans',
            }}
          >
            See where Korzi machines are built and tested for real performance.
          </p>

          {/* Steps List */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {steps.map((step, index) => (
              <button
                key={step.name}
                onClick={() => setActiveStep(index)}
                className="text-center"
              >
                <span 
                  className={`uppercase transition-all block ${
                    index === activeStep ? 'text-[#02FF00]' : 'text-transparent'
                  }`}
                  style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '32px',
                    lineHeight: '32px',
                    WebkitTextStroke: '1px',
                    WebkitTextStrokeColor: index === activeStep ? 'transparent' : '#4A4A4A',
                  }}
                >
                  {step.name}
                </span>
              </button>
            ))}
          </div>

          {/* Images */}
          <div className="relative w-full max-w-md mb-6">
            <div className="grid grid-cols-2 gap-3">
              <img 
                src={getCloudinaryUrl(steps[activeStep].image1)} 
                alt={steps[activeStep].name}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <img 
                src={getCloudinaryUrl(steps[activeStep].image2)} 
                alt={`${steps[activeStep].name} detail`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Button */}
          <Link 
            to="/about"
            className="bg-[#3A3A3A] text-white px-4 py-3 flex items-center gap-2 border-l-4 border-[#02FF00] group relative overflow-hidden cursor-pointer w-fit"
            style={{
              fontFamily: 'DM Sans',
              fontSize: '12px',
              letterSpacing: '0.05em'
            }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              ABOUT US
            </span>
            <ArrowUpRight className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-6">
          {/* Left: Title and Steps */}
          <div className="col-span-3 flex flex-col justify-between">
            <div>
              <h2 
                className="text-white uppercase mb-4"
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '48px',
                  lineHeight: '48px',
                }}
              >
                REAL MACHINES MADE BY REAL PEOPLE.
              </h2>
              <p 
                className="text-white mb-12"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
              >
                See where Korzi machines are built and tested for real performance.
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <button
                  key={step.name}
                  onClick={() => setActiveStep(index)}
                  className="flex items-center gap-3 w-full text-left group"
                >
                  <span 
                    className={`uppercase transition-all ${
                      index === activeStep ? 'text-[#02FF00]' : 'text-transparent group-hover:text-[#02FF00]'
                    }`}
                    style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: '40px',
                      lineHeight: '40px',
                      WebkitTextStroke: '1px',
                      WebkitTextStrokeColor: index === activeStep ? 'transparent' : '#4A4A4A',
                    }}
                  >
                    {step.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Overlapping Images Section */}
          <div className="col-span-8 flex justify-center items-center">
            <div className="relative w-full max-w-[800px] h-[400px] md:h-[500px] lg:h-[600px]">
              {/* First Image - Top Left */}
              <div className="absolute w-[45%] md:w-[370px] h-[250px] md:h-[350px] lg:h-[410px] z-10 top-0 left-[10%] md:left-[150px]">
                <img 
                  src={getCloudinaryUrl(steps[activeStep].image1)} 
                  alt={steps[activeStep].name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Second Image - Bottom Right with Overlay */}
              <div className="absolute w-[45%] md:w-[370px] h-[250px] md:h-[350px] lg:h-[410px] z-20 top-[120px] md:top-[150px] lg:top-[180px] right-[5%] md:-right-[110px]">
                <img 
                  src={getCloudinaryUrl(steps[activeStep].image2)} 
                  alt={`${steps[activeStep].name} detail`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Curved Arrow and Text */}
              <div className="absolute left-[55%] md:left-[530px] top-[80px] md:top-[100px] lg:top-[120px] flex items-start gap-1 z-30">
                <img 
                  src={getCloudinaryUrl('/assets/homepage/curvedarrow.png')} 
                  alt="arrow"
                  className="w-8 h-8 md:w-10 md:h-10"
                  loading="lazy"
                />
                <span className="text-[#02FF00] text-xs md:text-sm" style={{ fontFamily: 'DM Sans' }}>
                  Some BTS for you :)
                </span>
              </div>

              {/* Button - Positioned between images */}
              <Link 
                to="/about"
                className="absolute left-[30%] md:left-[375px] top-[280px] md:top-[360px] lg:top-[425px] bg-[#3A3A3A] text-white px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3 border-l-4 border-[#02FF00] z-30 group relative overflow-hidden cursor-pointer w-fit"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '12px',
                  letterSpacing: '0.05em'
                }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  ABOUT US
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
