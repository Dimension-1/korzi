import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CartDrawer from '../CartDrawer';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { openDrawer, getTotalItems, cartItems } = useCartStore();
  const { customer, isAuthenticated, logout } = useAuthStore();

  const totalItems = getTotalItems();

  useEffect(() => {
    console.log('AppLayout - Cart items changed:', cartItems);
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Always show navbar in hero section (first screen)
      if (currentScrollY < heroHeight) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      
      {/* === GLOBAL HEADER === */}
      <div className={`fixed top-4 left-4 right-4 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-24'
      }`}>
        <header className="bg-black flex items-stretch md:items-center md:justify-between shadow-xl border border-gray-700 md:px-4 md:py-3">
          {/* Hamburger - Desktop only (left side) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hidden md:block text-white p-2 hover:text-[#02FF00] transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo - Left on mobile, Center on desktop */}
          <Link to="/" className="flex items-center justify-center border-r border-gray-700 py-4 w-[60%] md:w-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:border-0 md:py-0">
            <img 
              src={getCloudinaryUrl('/logo-horizontal.png')} 
              alt="KORZI" 
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Right Icons */}
          <div className="flex items-stretch md:items-center flex-1 md:flex-none md:gap-3">
            <button 
              onClick={openDrawer}
              className="relative hover:opacity-80 transition-opacity py-4 border-r border-gray-700 flex-1 flex items-center justify-center md:border-0 md:py-0 md:flex-none" 
              aria-label="Cart"
            >
              <img src={getCloudinaryUrl('/assets/homepage/cart.png')} alt="Cart" className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-2 right-[calc(50%-20px)] md:-top-1 md:-right-1 bg-[#02FF00] text-black text-[10px] md:text-[9px] font-bold rounded-full w-5 h-5 md:w-4 md:h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="hidden md:block h-8 w-px bg-gray-700"></div>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="hover:opacity-80 transition-opacity py-4 border-r border-gray-700 flex-1 flex items-center justify-center md:border-0 md:py-0 md:flex-none"
              aria-label="Profile"
            >
              <img src={getCloudinaryUrl('/assets/homepage/profile.png')} alt="Profile" className="w-6 h-6" />
            </button>
            {/* Hamburger - Mobile only (right side) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white py-4 hover:text-[#02FF00] transition-colors flex-1 flex items-center justify-center"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* === DROPDOWN MENU === */}
      {menuOpen && (
        <div className="fixed top-[68px] left-4 right-4 md:w-64 md:right-auto bg-black shadow-xl z-40 border-l border-r border-b border-gray-700">
          {/* Navigation Links */}
          <nav className="flex flex-col px-6 md:px-8 py-6 md:py-8 text-white font-heading uppercase">
            {location.pathname !== '/' && (
              <Link to="/" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setMenuOpen(false)}>
                <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                <span className="group-hover:scale-110 transition-transform duration-300">Home</span>
              </Link>
            )}
            {location.pathname !== '/shop' && (
            <Link to="/shop" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Shop</span>
            </Link>
            )}
            {location.pathname !== '/about' && (
            <Link to="/about" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">About</span>
            </Link>
            )}
            {/* {location.pathname !== '/events' && (
            <Link to="/events" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Events</span>
            </Link>
            )} */}
            {/* {location.pathname !== '/partner' && (
            <Link to="/partner" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Partner with Korzi</span>
            </Link>
            )} */}
            {location.pathname !== '/logs' && (
            <Link to="/logs" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Logs</span>
            </Link>
            )}
            {/* {location.pathname !== '/crew' && (
            <Link to="/crew" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Korzi Crew</span>
            </Link>
            )} */}
            {location.pathname !== '/support' && (
            <Link to="/support" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Support</span>
            </Link>
            )}
            {/* {location.pathname !== '/careers' && (
            <Link to="/careers" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Careers</span>
            </Link>
            )} */}
          </nav>
        </div>
      )}

      {/* Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* === PROFILE DROPDOWN === */}
      {profileOpen && (
        <div className="fixed top-[68px] right-4 md:w-64 bg-black shadow-xl z-40 border-l border-r border-b border-gray-700">
          <nav className="flex flex-col px-6 md:px-8 py-6 md:py-8 text-white font-heading uppercase">
            {isAuthenticated ? (
              <>
                <p className="text-sm text-gray-400 mb-4 normal-case">{customer?.displayName || customer?.email}</p>
                <Link to="/orders" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 border-b border-gray-700" onClick={() => setProfileOpen(false)}>
                  <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  <span className="group-hover:scale-110 transition-transform duration-300">My Orders</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3 text-left"
                >
                  <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  <span className="group-hover:scale-110 transition-transform duration-300">Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/signin" className="text-lg hover:text-white transition-all duration-300 flex items-center group py-3" onClick={() => setProfileOpen(false)}>
                <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                <span className="group-hover:scale-110 transition-transform duration-300">Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Profile Overlay */}
      {profileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setProfileOpen(false)}
        />
      )}

      {/* === MAIN CONTENT === */}
      <main>
        <Outlet />
      </main>

      {/* === CART DRAWER === */}
      <CartDrawer />
    </div>
  );
}