import { Instagram, Youtube, Linkedin } from 'lucide-react';

export default function JoinFamSection() {
  return (
    <section className="bg-black py-16 px-8">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Text Content */}
        <div className="space-y-15">
          <h2 
            className="uppercase bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '80px',
              lineHeight: '96px',
              letterSpacing: '0.02em'
            }}
          >
            COME, JOIN THE CREW.
          </h2>
          
          <div className="space-y-2 text-white" style={{ fontFamily: 'DM Sans', fontSize: '16px', lineHeight: '24px' }}>
            <p>Machines don't move the world : people do.</p>
            <p>The Korzi Crew is our community of builders, racers,</p>
            <p>tinkerers, and everyday rebels who like things that move.</p>
          </div>
          
          {/* Social Buttons */}
          <div className="space-y-3 mt-32">
            <button className="w-full border border-gray-500 text-white flex items-center h-14 relative overflow-hidden group">
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <div className="border-r border-gray-500 px-5 h-full flex items-center relative z-10">
                <Instagram className="w-6 h-6 text-[#02FF00]" />
              </div>
              <span className="flex-1 text-center text-sm relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', letterSpacing: '0.1em' }}>BE A PART OF  OUR INSTAGRAM COMMUNITY</span>
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="border border-gray-500 text-white flex items-center h-14 relative overflow-hidden group">
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <div className="border-r border-gray-500 px-5 h-full flex items-center relative z-10">
                  <Linkedin className="w-6 h-6 text-[#02FF00]" />
                </div>
                <span className="flex-1 text-center text-sm relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', letterSpacing: '0.1em' }}>LINKEDIN</span>
              </button>
              
              <button className="border border-gray-500 text-white flex items-center h-14 relative overflow-hidden group">
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <div className="border-r border-gray-500 px-5 h-full flex items-center relative z-10">
                  <Youtube className="w-6 h-6 text-[#02FF00]" />
                </div>
                <span className="flex-1 text-center text-sm relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', letterSpacing: '0.1em' }}>YOUTUBE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative">
          <img
            src="/assets/homepage/Korziteam.png"
            alt="Korzi Crew"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
