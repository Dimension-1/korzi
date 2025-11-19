import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from './../stores/cartStore';
import { useAuthStore } from './../stores/authStore';

export default function GlobalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openDrawer, getTotalItems } = useCartStore();
  const { customer, isAuthenticated, logout } = useAuthStore();
  const totalItems = getTotalItems();

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-8 py-6">
        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white p-2 hover:text-[#02FF00] transition-colors"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo - Center */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/logo-horizontal.png" 
            alt="KORZI" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={openDrawer}
            className="relative text-white p-2 hover:text-[#02FF00] transition-colors" 
            aria-label="Cart"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#02FF00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <Link to="/signin" className="text-white p-2 hover:text-[#02FF00] transition-colors" aria-label="Account">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/90 backdrop-blur-sm z-60 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src="/logo-horizontal.png" alt="Korzi" className="h-10 w-auto" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:text-[#02FF00] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-6 p-8 text-white font-heading uppercase">
          <Link to="/" className="text-lg hover:text-[#02FF00] transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="text-lg hover:text-[#02FF00] transition-colors" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/logs" className="text-lg hover:text-[#02FF00] transition-colors" onClick={() => setMenuOpen(false)}>Logs</Link>
          <Link to="/orders" className="text-lg hover:text-[#02FF00] transition-colors" onClick={() => setMenuOpen(false)}>Orders</Link>
          
          {isAuthenticated && (
            <div className="pt-6 border-t border-gray-800">
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
      
    {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
