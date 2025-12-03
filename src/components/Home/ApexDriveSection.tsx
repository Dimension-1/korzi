import { Link } from 'react-router-dom';
import { ArrowUpRight } from "lucide-react";
import MarqueeBar from './MarqueeBar';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function ApexDriveSection() {
    return (
      <section className="bg-black py-4 md:py-8 relative pb-16 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-8">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center px-4">
          {/* KORZI Logo */}
          <div className="mb-4">
            <img 
              src={getCloudinaryUrl('/assets/homepage/korziwithouticon.png')} 
              alt="KORZI" 
              className="h-6"
            />
          </div>

          {/* APEX DRIVE Title */}
          <div className="mb-0 relative z-0">
            <img 
              src={getCloudinaryUrl('/assets/homepage/ApexDrive.png')}
              alt="APEX DRIVE"
              className="w-auto h-[32px]"
            />
          </div>

          {/* Car Image */}
          <div className="relative z-10 -mt-12 mb-0 flex right-20">
            <img
              src={getCloudinaryUrl('/assets/homepage/Car_1.png')}
              alt="Apex Drive K-01"
              className="w-[120%] max-w-none h-auto object-contain"
            />
          </div>

          {/* Marquee Bar */}
          <div className="w-screen -mx-8 -mt-1 mb-6 relative z-0">
            <MarqueeBar />
          </div>

          {/* Description Text */}
          <p 
            className="text-white text-sm leading-relaxed mb-4 max-w-md"
            style={{
              fontFamily: 'DM Sans',
            }}
          >
            The Apex Drive K-01 is built with the attitude of a full-size machine tight suspension, responsive throttle, and a very strong body that takes hits without flinching.
          </p>

          <p 
            className="text-white text-sm leading-relaxed mb-6 max-w-md"
            style={{
              fontFamily: 'DM Sans',
            }}
          >
            It's a small machine with a big-boy spirit, made to deliver real drive on any surface you throw at it.
          </p>

          {/* Button */}
          <Link 
            to="/shop"
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-4 border-[#02FF00] group relative overflow-hidden w-[250px] h-[56px]"
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
            }}
          >
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">EXPLORE MORE</span>
            <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block mt-8">
          {/* KORZI Logo - Centered at top */}
          <div className="text-center mb-6">
            <img 
              src={getCloudinaryUrl('/assets/homepage/korziwithouticon.png')} 
              alt="KORZI" 
              className="h-5 mx-auto"
            />
          </div>
  
          {/* APEX DRIVE Title - Slight overlap with car */}
          <div className="flex justify-center relative z-0 mb-2">
            <img 
              src={getCloudinaryUrl('/assets/homepage/ApexDrive.png')}
              alt="APEX DRIVE"
              className="w-auto h-[53px]"
            />
          </div>
  
          {/* Main Content - Car with text on sides */}
          <div className="relative max-w-full flex items-start justify-center">
            {/* Left Text */}
            <div 
              className="relative -left-10 z-10 mt-8"
              style={{
                width: '349px',
                fontFamily: 'DM Sans',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '21px',
                color: '#FFFFFF',
              }}
            >
              <p>
                The Apex Drive K-01 is built with the attitude of a full-size machine tight suspension, responsive throttle, and a very strong body that takes hits without flinching.
              </p>
            </div>
  
            {/* Center: Large Car Image */}
            <div 
              className="relative z-10 -ml-40 w-[920px] max-w-[920px]"
              style={{
                marginTop: '-8rem',
              }}
            >
              <img
                src={getCloudinaryUrl('/assets/homepage/Car_1.png')}
                alt="Apex Drive K-01"
                className="w-full h-auto object-contain"
              />
            </div>
  
            {/* Right Text */}
            <div 
              className="relative z-10 mt-8 -mb-30"
              style={{
                width: '293px',
                fontFamily: 'DM Sans',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '21px',
                color: '#FFFFFF',
              }}
            >
              <p>
                It's a small machine with a big-boy spirit, made to deliver real drive on any surface you throw at it.
              </p>
            </div>
          </div>
  
          {/* Button - Left aligned */}
          <div className="-mt-72 relative z-20 flex justify-center">
            <div className="w-full max-w-full flex items-start">
              <div className="relative -left-10">
          <Link 
                to="/shop"
                className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-4 border-[#02FF00] group relative overflow-hidden w-[275px] h-[64px]"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '16px',
                  lineHeight: '21px',
                }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">EXPLORE MORE</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    );
  }
