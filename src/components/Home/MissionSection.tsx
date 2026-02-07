import { ArrowUpRight } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';


export default function MissionSection() {
  const navigate = useNavigate();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { customer } = useAuthStore();
  
  const handleJoinUs = async () => {
    if (!customer?.email) {
      navigate('/signin');
      return;
    }
    
    setIsSubscribing(true);
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://korzi.toys';
      console.log('Newsletter API URL:', `${backendUrl}/api/newsletter/subscribe`);
      
      const response = await fetch(`${backendUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: customer.email,
          logName: 'Join Us' 
        })
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }
      
      const data = JSON.parse(responseText);
      console.log('Newsletter subscription success:', data);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setTimeout(() => setIsSubscribing(false), 1000);
    }
  };
  
  return (
    <section className="bg-black py-8 md:py-16 min-h-[500px] md:min-h-[600px]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Mission Statement Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-center text-center lg:text-left">
          {/* Title - First on Mobile */}
          <h3 
            className="uppercase mb-4 lg:hidden bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-2xl leading-tight"
            style={{
              fontFamily: 'Bebas Neue',
            }}
          >
            WE'RE ALSO FIXING HOW PEOPLE THINK ABOUT TOYS.
          </h3>

          {/* Image - Second on Mobile */}
          <div className="relative lg:order-2">
             <div className="text-[#02FF00] text-6xl">
              <img 
                src={getCloudinaryUrl('/assets/homepage/network.png')} 
                alt="Network circuit board"
                className="w-full h-auto max-w-full"
                style={{ filter: 'brightness(1.2)' }}
                loading="lazy"
              />
              </div>
          </div>

          {/* Text Content */}
          <div className="lg:order-1">
            <h3 
              className="hidden lg:block uppercase mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-[48px] leading-[48px]"
              style={{
                fontFamily: 'Bebas Neue',
              }}
            >
              WE'RE ALSO FIXING HOW PEOPLE THINK ABOUT TOYS.
            </h3>

            <p className="text-white mb-4 md:mb-6 text-sm md:text-base leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
              Somewhere along the way, toys became soft, disposable, and forgettable.<br />
              We grew up, but the machines we loved didn't.<br />
              Korzi exists to change that.
            </p>

            <p className="text-white font-bold mb-6 md:mb-8 text-sm md:text-base leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
              Because the world doesn't need low quality toys.<br />
              It needs machines that make you learn and feel alive.
            </p>

            <button 
              onClick={handleJoinUs}
              disabled={isSubscribing}
              className="bg-[#3A3A3A] text-white px-6 md:px-8 py-3 flex items-center gap-2 md:gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden mx-auto lg:mx-0 disabled:opacity-50"
            >
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 text-xs md:text-sm" style={{ fontFamily: 'DM Sans', letterSpacing: '0.05em' }}>
                {isSubscribing ? 'Subscribed for Updates!' : 'JOIN US'}
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
