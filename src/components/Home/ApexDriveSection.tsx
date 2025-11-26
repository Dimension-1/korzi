import { Link } from 'react-router-dom';
import { ArrowUpRight } from "lucide-react";

export default function ApexDriveSection() {
    return (
      <section className="bg-black py-8 relative pb-32">
        <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-8">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* KORZI Logo - Centered at top */}
          <div className="text-center mb-6">
            <img 
              src="/assets/homepage/korziwithouticon.png" 
              alt="KORZI" 
              className="h-5 mx-auto"
            />
          </div>
  
          {/* APEX DRIVE Title - Slight overlap with car */}
          <div className="flex justify-center relative z-0 mb-2">
            <img 
              src="/assets/homepage/ApexDrive.png"
              alt="APEX DRIVE"
              style={{
                width: '691.01px',
                height: '53.39px',
              }}
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
              className="relative z-10 -ml-40 -mt-40"
              style={{
                width: '920px',
                height: '654px',
                marginTop: 'calc(-10rem + 6px)',
              }}
            >
              <img
                src="/assets/homepage/Car_1.png"
                alt="Apex Drive K-01"
                className="w-full h-full object-contain"
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
                className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-4 border-[#02FF00] group relative overflow-hidden"
                style={{
                  width: '275px',
                  height: '64px',
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

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="text-center mb-4">
            <img 
              src="/assets/homepage/korziwithouticon.png" 
              alt="KORZI" 
              className="h-5 mx-auto"
            />
          </div>

          <div className="flex justify-center mb-4">
            <img 
              src="/assets/homepage/ApexDrive.png"
              alt="APEX DRIVE"
              className="w-full max-w-[300px] h-auto"
            />
          </div>

          <div className="relative" style={{ marginLeft: '-108px', width: '480px', height: '341px' }}>
            <img
              src="/assets/homepage/Car_1.png"
              alt="Apex Drive K-01"
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="w-full overflow-hidden" style={{ marginTop: '32px', marginLeft: '-98px' }}>
            <div style={{ width: '1201.59px', height: '31px' }}>
              {/* Scrolling text */}
            </div>
          </div>

          <div className="px-6" style={{ marginTop: '20px' }}>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '22px',
                color: '#FFFFFF',
                textAlign: 'center'
              }}
            >
              The Apex Drive K-01 is built with the attitude of a full-size machine tight suspension, responsive throttle, and a very strong body that takes hits without flinching.
            </p>

            <p
              style={{
                marginTop: '21px',
                fontSize: '14px',
                lineHeight: '22px',
                color: '#FFFFFF',
                textAlign: 'center'
              }}
            >
              It's a small machine with a big-boy spirit, made to deliver real drive on any surface you throw at it.
            </p>
          </div>

          <div className="flex justify-center" style={{ marginTop: '31px' }}>
            <Link
              to="/product-description"
              className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-4 border-[#02FF00]"
              style={{
                width: '145.5px',
                height: '48px',
                fontSize: '14px'
              }}
            >
              <span>EXPLORE MORE</span>
              <ArrowUpRight className="w-4 h-4 text-[#02FF00]" />
            </Link>
          </div>
        </div>
        </div>
      </section>
    );
  }
