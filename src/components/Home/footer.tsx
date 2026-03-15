import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import PaymentIcons from '../PaymentIcons';


export default function Footer() {
  const navigate = useNavigate();
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  const { customer } = useAuthStore();
  
  const handleSubscribe = async () => {
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
          logName: 'Subscribed for Updates' 
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
    <footer className="relative min-h-[600px] md:min-h-[800px]">
      {/* Desktop Car Image Section */}
      <div className="hidden md:flex relative w-full h-[360px] items-center justify-center bg-black">
        <img 
          src={getCloudinaryUrl('/assets/homepage/Car_2.png')} 
          alt="Korzi RC Car"
          className="w-[632px] h-[356px] object-contain"
        />
      </div>

      {/* Mobile Car Image Section */}
      <div className="md:hidden relative w-full h-[200px] flex items-center justify-center bg-black">
        <img 
          src={getCloudinaryUrl('/assets/homepage/Car_2.png')} 
          alt="Korzi RC Car"
          className="w-auto h-full object-contain"
        />
      </div>

      {/* Desktop Footer Content */}
      <div className="hidden md:block w-full bg-grey">
        <div className="grid gap-0 border-t border-gray-600" style={{ gridTemplateColumns: '22% 19.5% 19.5% 19.5% 19.5%' }}>
          
          {/* Logo & Subscribe Column */}
          <div className="flex flex-col justify-between p-12">
            <img 
              src={getCloudinaryUrl('/logo-horizontal.png')} 
              alt="KORZI" 
              className="h-12 w-auto max-w-[200px]"
            />
            <div className="space-y-8 mt-auto">
              <button 
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l border-[#02FF00] group relative overflow-hidden cursor-pointer disabled:opacity-50"
                style={{
                  borderLeftWidth: '3px',
                  width: '215px',
                  height: '52px',
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  lineHeight: '18px',
                }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {isSubscribing ? 'Subscribed for Updates!' : 'Subscribe For Updates!'}
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </button>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/korzitoys/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
                  <Instagram className="w-6 h-6 text-[#02FF00]" strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/company/korzi/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
                  <Linkedin className="w-6 h-6 text-[#02FF00]" strokeWidth={1.5} />
                </a>
                <a href="https://www.youtube.com/@KorziToys" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
                  <Youtube className="w-6 h-6 text-[#02FF00]" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="p-12 border-l border-[#02FF00]" style={{ borderLeftWidth: '0.5px' }}>
            <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'Bebas Neue', fontSize: '40px', lineHeight: '48px' }}>SHOP</h3>
            <Link to="/shop"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Korzi Apex Drive RC Car</span>
            </Link>
          </div>

          {/* COMPANY Column */}
          <div className="p-12 border-l border-[#02FF00]" style={{ borderLeftWidth: '0.5px' }}>
          <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'Bebas Neue', fontSize: '40px', lineHeight: '48px' }}>COMPANY</h3>
            <ul className="space-y-3">
              <li><Link to="/about"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">About Us</span></Link></li>
              {/* <li><Link to="/careers"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Careers</span></Link></li> */}
              <li><Link to="/logs"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Logs</span></Link></li>
              {/* <li><Link to="/events"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Events</span></Link></li> */}
              {/* <li><Link to="/partners"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Partners</span></Link></li> */}
              {/* <li><Link to="/crew"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Korzi Crew</span></Link></li> */}
            </ul>
          </div>

          {/* USER RESOURCES Column */}
          <div className="p-12 border-l border-[#02FF00]" style={{ borderLeftWidth: '0.5px' }}>
          <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'Bebas Neue', fontSize: '40px', lineHeight: '48px' }}>USER RESOURCES</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Privacy Policy</span></Link></li>
              <li><Link to="/support"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Support</span></Link></li>
              <li><Link to="/shipping"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Shipping Policy</span></Link></li>
              <li><Link to="/return-exchange"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Return & Exchange</span></Link></li>
              <li><Link to="/terms"  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Terms & Conditions</span></Link></li>
            </ul>
          </div>

          {/* CONTACT Column */}
          <div className="p-12 border-l border-[#02FF00]" style={{ borderLeftWidth: '0.5px' }}>
          <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'Bebas Neue', fontSize: '40px', lineHeight: '48px' }}>CONTACT</h3>
            <div className="space-y-3 text-white">
              <p>+91 9844228731</p>
              <p>Team@korzi.toys</p>
              <p className="text-sm">JP Nagar, Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Copyright with border */}
        <div 
          className="flex items-center justify-between px-12 py-8 border-t border-gray-600"
          style={{ height: '72px' }}
        >
          <span className="text-white text-sm">Korzi@2025</span>
          <PaymentIcons size="lg" />
        </div>
      </div>

      {/* Mobile Footer Content */}
      <div className="md:hidden w-full bg-grey">
        {/* Logo */}
        <div className="flex justify-center py-6 border-t border-gray-600">
          <img 
            src={getCloudinaryUrl('/logo-horizontal.png')} 
            alt="KORZI" 
            className="h-12"
          />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 border-t border-gray-600">
          {/* SHOP Column */}
          <div className="p-6 border-r border-[#02FF00]" style={{ borderRightWidth: '0.5px' }}>
            <h3 className="text-white uppercase mb-4" style={{ fontFamily: 'Bebas Neue', fontSize: '28px', lineHeight: '32px' }}>SHOP</h3>
            <Link to="/shop"  className="text-white text-sm">Korzi Apex Drive RC Car</Link>
          </div>

          {/* COMPANY Column */}
          <div className="p-6">
            <h3 className="text-white uppercase mb-4" style={{ fontFamily: 'Bebas Neue', fontSize: '28px', lineHeight: '32px' }}>COMPANY</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about"  className="text-white">About Us</Link></li>
              {/* <li><Link to="/careers"  className="text-white">Careers</Link></li> */}
              <li><Link to="/logs"  className="text-white">Logs</Link></li>
              {/* <li><Link to="/events"  className="text-white">Events</Link></li> */}
              {/* <li><Link to="/partners"  className="text-white">Partners</Link></li> */}
              {/* <li><Link to="/crew"  className="text-white">Korzi Crew</Link></li> */}
            </ul>
          </div>

          {/* USER RESOURCES Column */}
          <div className="p-6 border-t border-r border-gray-600" style={{ borderRightColor: '#02FF00', borderRightWidth: '0.5px' }}>
            <h3 className="text-white uppercase mb-4" style={{ fontFamily: 'Bebas Neue', fontSize: '28px', lineHeight: '32px' }}>USER RESOURCES</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy"  className="text-white">Privacy Policy</Link></li>
              <li><Link to="/support"  className="text-white">Support</Link></li>
              <li><Link to="/shipping"  className="text-white">Shipping Policy</Link></li>
              <li><Link to="/return-exchange"  className="text-white">Return & Exchange</Link></li>
              <li><Link to="/terms"  className="text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* CONTACT Column */}
          <div className="p-6 border-t border-gray-600">
            <h3 className="text-white uppercase mb-4" style={{ fontFamily: 'Bebas Neue', fontSize: '28px', lineHeight: '32px' }}>CONTACT</h3>
            <div className="space-y-2 text-sm text-white">
              <p>+91 9844228731</p>
              <p>Team@korzi.toys</p>
              <p>JP Nagar, Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Subscribe & Social */}
        <div className="px-6 py-6 border-t border-gray-600 flex items-center justify-between">
          <button 
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l border-[#02FF00] disabled:opacity-50"
            style={{
              borderLeftWidth: '3px',
              height: '48px',
              width: '200px',
              fontSize: '13px',
            }}
          >
            <span>{isSubscribing ? 'Subscribed for Updates!' : 'Subscribe For Updates!'}</span>
            <ArrowUpRight className="w-4 h-4 text-[#02FF00]" />
          </button>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/korzitoys/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
              <Instagram className="w-8 h-8 text-[#02FF00]" strokeWidth={1.5} />
            </a>
            <a href="https://www.linkedin.com/company/korzi/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
              <Linkedin className="w-8 h-8 text-[#02FF00]" strokeWidth={1.5} />
            </a>
            <a href="https://www.youtube.com/@KorziToys" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
              <Youtube className="w-8 h-8 text-[#02FF00]" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-3 py-6 border-t border-gray-600">
          <PaymentIcons size="md" />
          <span className="text-white text-sm">Korzi@2025</span>
        </div>
      </div>
    </footer>
  );
}
