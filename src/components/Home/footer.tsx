import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function Footer() {
  const navigate = useNavigate();
  
  const handleLinkClick = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };
  
  return (
    <footer className="relative">
      {/* Desktop Car Image Section */}
      <div className="hidden md:flex relative w-full h-[360px] items-center justify-center bg-black">
        <img 
          src={getCloudinaryUrl('/Car_2_wst85g.png')} 
          alt="Korzi RC Car"
          className="w-[632px] h-[356px] object-contain"
        />
      </div>

      {/* Mobile Car Image Section */}
      <div className="md:hidden relative w-full flex items-center justify-center bg-black">
        <img 
          src={getCloudinaryUrl('/assets/homepage/Car_2.png')} 
          alt="Korzi RC Car"
          className="w-full max-w-[400px] h-auto object-contain"
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
                onClick={() => navigate('/subscribe')}
                className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l border-[#02FF00] group relative overflow-hidden cursor-pointer"
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
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Subscribe For Updates!</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </button>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/korzitoys/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
                  <Instagram className="w-6 h-6 text-[#02FF00]" strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/company/korzi/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
                  <Linkedin className="w-6 h-6 text-[#02FF00]" strokeWidth={1.5} />
                </a>
                <a href="https://youtube.com/korzi" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
                  <Youtube className="w-6 h-6 text-[#02FF00]" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="p-12 border-l border-[#02FF00]" style={{ borderLeftWidth: '0.5px' }}>
            <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'Bebas Neue', fontSize: '40px', lineHeight: '48px' }}>SHOP</h3>
            <Link to="/shop" onClick={() => handleLinkClick('/shop')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group">
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Korzi Apex Drive RC Car</span>
            </Link>
          </div>

          {/* COMPANY Column */}
          <div className="p-12 border-l border-[#02FF00]" style={{ borderLeftWidth: '0.5px' }}>
          <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'Bebas Neue', fontSize: '40px', lineHeight: '48px' }}>COMPANY</h3>
            <ul className="space-y-3">
              <li><Link to="/about" onClick={() => handleLinkClick('/about')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">About Us</span></Link></li>
              <li><Link to="/careers" onClick={() => handleLinkClick('/careers')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Careers</span></Link></li>
              <li><Link to="/logs" onClick={() => handleLinkClick('/logs')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Logs</span></Link></li>
              <li><Link to="/events" onClick={() => handleLinkClick('/events')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Events</span></Link></li>
              <li><Link to="/partners" onClick={() => handleLinkClick('/partners')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Partners</span></Link></li>
              <li><Link to="/crew" onClick={() => handleLinkClick('/crew')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Korzi Crew</span></Link></li>
            </ul>
          </div>

          {/* USER RESOURCES Column */}
          <div className="p-12 border-l border-[#02FF00]" style={{ borderLeftWidth: '0.5px' }}>
          <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'Bebas Neue', fontSize: '40px', lineHeight: '48px' }}>USER RESOURCES</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" onClick={() => handleLinkClick('/privacy')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Privacy Policy</span></Link></li>
              <li><Link to="/support" onClick={() => handleLinkClick('/support')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Support</span></Link></li>
              <li><Link to="/shipping" onClick={() => handleLinkClick('/shipping')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Shipping</span></Link></li>
              <li><Link to="/delivery" onClick={() => handleLinkClick('/delivery')} className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span><span className="group-hover:scale-110 transition-transform duration-300">Delivery</span></Link></li>
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
          className="text-center text-white text-sm py-8 border-t border-gray-600"
          style={{ height: '72px' }}
        >
          Korzi@2025
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
            <Link to="/shop" onClick={() => handleLinkClick('/shop')} className="text-white text-sm">Korzi Apex Drive RC Car</Link>
          </div>

          {/* COMPANY Column */}
          <div className="p-6">
            <h3 className="text-white uppercase mb-4" style={{ fontFamily: 'Bebas Neue', fontSize: '28px', lineHeight: '32px' }}>COMPANY</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" onClick={() => handleLinkClick('/about')} className="text-white">About Us</Link></li>
              <li><Link to="/careers" onClick={() => handleLinkClick('/careers')} className="text-white">Careers</Link></li>
              <li><Link to="/logs" onClick={() => handleLinkClick('/logs')} className="text-white">Logs</Link></li>
              <li><Link to="/events" onClick={() => handleLinkClick('/events')} className="text-white">Events</Link></li>
              <li><Link to="/partners" onClick={() => handleLinkClick('/partners')} className="text-white">Partners</Link></li>
              <li><Link to="/crew" onClick={() => handleLinkClick('/crew')} className="text-white">Korzi Crew</Link></li>
            </ul>
          </div>

          {/* USER RESOURCES Column */}
          <div className="p-6 border-t border-r border-gray-600" style={{ borderRightColor: '#02FF00', borderRightWidth: '0.5px' }}>
            <h3 className="text-white uppercase mb-4" style={{ fontFamily: 'Bebas Neue', fontSize: '28px', lineHeight: '32px' }}>USER RESOURCES</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" onClick={() => handleLinkClick('/privacy')} className="text-white">Privacy Policy</Link></li>
              <li><Link to="/support" onClick={() => handleLinkClick('/support')} className="text-white">Support</Link></li>
              <li><Link to="/shipping" onClick={() => handleLinkClick('/shipping')} className="text-white">Shipping</Link></li>
              <li><Link to="/delivery" onClick={() => handleLinkClick('/delivery')} className="text-white">Delivery</Link></li>
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
            onClick={() => navigate('/subscribe')}
            className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l border-[#02FF00]"
            style={{
              borderLeftWidth: '3px',
              height: '48px',
              width: '200px',
              fontSize: '13px',
            }}
          >
            <span>Subscribe For Updates!</span>
            <ArrowUpRight className="w-4 h-4 text-[#02FF00]" />
          </button>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/korzitoys/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
              <Instagram className="w-8 h-8 text-[#02FF00]" strokeWidth={1.5} />
            </a>
            <a href="https://www.linkedin.com/company/korzi/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
              <Linkedin className="w-8 h-8 text-[#02FF00]" strokeWidth={1.5} />
            </a>
            <a href="https://youtube.com/korzi" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-125">
              <Youtube className="w-8 h-8 text-[#02FF00]" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white text-sm py-6 border-t border-gray-600">
          Korzi@2025
        </div>
      </div>
    </footer>
  );
}
