import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CartDrawer from '../CartDrawer';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openDrawer, getTotalItems, cartItems } = useCartStore();
  const { customer, isAuthenticated, logout } = useAuthStore();

  const totalItems = getTotalItems();

  useEffect(() => {
    console.log('AppLayout - Cart items changed:', cartItems);
  }, [cartItems]);

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      
      {/* === GLOBAL HEADER === */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <header className="bg-black flex items-center justify-between px-6 py-3 shadow-xl">
          {/* Hamburger/Close Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2 hover:text-[#02FF00] transition-colors"
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

          {/* Logo - Center */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="/logo-horizontal.png" 
              alt="KORZI" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={openDrawer}
              className="relative hover:opacity-80 transition-opacity" 
              aria-label="Cart"
            >
              <img src="/assets/homepage/cart.png" alt="Cart" className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#02FF00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="h-10 w-px bg-white/20"></div>
            <Link to="/signin" className="hover:opacity-80 transition-opacity" aria-label="Account">
              <img src="/assets/homepage/profile.png" alt="Profile" className="w-6 h-6" />
            </Link>
          </div>
        </header>
      </div>

      {/* === DROPDOWN MENU === */}
      {menuOpen && (
        <div className="fixed top-16 left-4 w-64 bg-black shadow-xl z-40">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 px-8 py-8 text-white font-heading uppercase">
            <Link to="/product-description" className="text-lg hover:text-white transition-all duration-300 flex items-center group" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Shop</span>
            </Link>
            <Link to="/about" className="text-lg hover:text-white transition-all duration-300 flex items-center group" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">About</span>
            </Link>
            <Link to="/events" className="text-lg hover:text-white transition-all duration-300 flex items-center group" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Events</span>
            </Link>
            <Link to="/partner" className="text-lg hover:text-white transition-all duration-300 flex items-center group" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Partner with Korzi</span>
            </Link>
            <Link to="/logs" className="text-lg hover:text-white transition-all duration-300 flex items-center group" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Logs</span>
            </Link>
            <Link to="/crew" className="text-lg hover:text-white transition-all duration-300 flex items-center group" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Korzi Crew</span>
            </Link>
            <Link to="/careers" className="text-lg hover:text-white transition-all duration-300 flex items-center group" onClick={() => setMenuOpen(false)}>
              <span className="w-0 group-hover:w-2 h-2 bg-[#02FF00] mr-0 group-hover:mr-3 transition-all duration-300"></span>
              <span className="group-hover:scale-110 transition-transform duration-300">Careers</span>
            </Link>
            
            {isAuthenticated && (
              <div className="pt-6 border-t border-gray-800 mt-4">
                <p className="text-sm text-gray-400 mb-4">{customer?.displayName || customer?.email}</p>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-lg hover:text-[#02FF00] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
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

      {/* === MAIN CONTENT === */}
      <main>
        <Outlet />
      </main>

      {/* === CART DRAWER === */}
      <CartDrawer />
    </div>
  );
}