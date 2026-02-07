import { Instagram, Youtube, Linkedin } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function JoinFamSection() {
  return (
    <section className="bg-black py-8 md:py-16 px-4 md:px-8 min-h-[500px] md:min-h-[700px]">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
        
        {/* Left Side - Text Content */}
        <div className="space-y-6 md:space-y-15 text-center lg:text-left">
          <h2 
            className="uppercase bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-3xl md:text-[80px] leading-tight md:leading-[96px]"
            style={{
              fontFamily: 'Bebas Neue',
              letterSpacing: '0.02em'
            }}
          >
            COME, JOIN THE CREW.
          </h2>
          
          <div className="space-y-1 md:space-y-2 text-white text-sm md:text-base" style={{ fontFamily: 'DM Sans', lineHeight: '24px' }}>
            <p>Machines don't move the world : people do.</p>
            <p>The Korzi Crew is our community of builders, racers,</p>
            <p>tinkerers, and everyday rebels who like things that move.</p>
          </div>
          
          {/* Social Buttons */}
          <div className="space-y-3 mt-6 md:mt-32">
            <a href="https://www.instagram.com/korzitoys/" target="_blank" rel="noopener noreferrer" className="w-full border border-gray-500 text-white flex items-center h-12 md:h-14 relative overflow-hidden group">
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <div className="border-r border-gray-500 px-3 md:px-5 h-full flex items-center relative z-10">
                <Instagram className="w-5 h-5 md:w-6 md:h-6 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </div>
              <span className="flex-1 text-center text-xs md:text-sm relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', letterSpacing: '0.1em' }}>BE A PART OF  OUR INSTAGRAM COMMUNITY</span>
            </a>
            
            <div className="grid grid-cols-2 gap-3">
              <a href="https://www.linkedin.com/company/korzi/" target="_blank" rel="noopener noreferrer" className="border border-gray-500 text-white flex items-center h-12 md:h-14 relative overflow-hidden group">
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <div className="border-r border-gray-500 px-3 md:px-5 h-full flex items-center relative z-10">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
                </div>
                <span className="flex-1 text-center text-xs md:text-sm relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', letterSpacing: '0.1em' }}>LINKEDIN</span>
              </a>
              
              <a href="https://www.youtube.com/@KorziToys" target="_blank" rel="noopener noreferrer" className="border border-gray-500 text-white flex items-center h-12 md:h-14 relative overflow-hidden group">
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <div className="border-r border-gray-500 px-3 md:px-5 h-full flex items-center relative z-10">
                  <Youtube className="w-5 h-5 md:w-6 md:h-6 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
                </div>
                <span className="flex-1 text-center text-xs md:text-sm relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', letterSpacing: '0.1em' }}>YOUTUBE</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full lg:order-2">
          <img
            src={getCloudinaryUrl('/assets/homepage/Korziteam.png')}
            alt="Korzi Crew"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
