'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  X,
  Search,
  Home,
  FileText,
  User,
  MoreVertical,
  ShoppingBagIcon,
  Handbag
} from 'lucide-react';

import AnnouncementBar from '../AnnouncementBar';
import CartDrawer from '../CartDrawer';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { openDrawer, getTotalItems, cartItems } = useCartStore();
  const { customer, isAuthenticated, logout } = useAuthStore();

  const totalItems = getTotalItems();

  // Debug: monitor cart changes
  useEffect(() => {
    console.log('AppLayout - Cart items changed:', cartItems);
  }, [cartItems]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Active link logic
  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const getLinkClasses = (href: string) => {
    const base = 'flex items-center gap-3 py-2 transition-colors duration-200 font-body no-underline';
    const active = 'text-[var(--primary)]';
    const inactive = 'text-[var(--foreground)] hover:text-[var(--primary)]';
    return `${base} ${isActive(href) ? active : inactive}`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-x-hidden">
      
      {/* === FIXED HEADER WRAPPER === */}
      {!isSidebarOpen && (
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Announcement Bar */}
          <div className="bg-[var(--primary)] text-[var(--background)] py-1 sm:py-2 overflow-hidden transition-all duration-300 ease-in-out">
            <AnnouncementBar />
          </div>

          {/* Header */}
          <header className="bg-[var(--background)] border-b border-gray-600 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 md:py-4">
              
              {/* Left: Logo / Sidebar Toggle */}
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="text-[var(--primary)] text-2xl font-heading hover:text-[var(--secondary)] transition-colors duration-200 no-underline"
                  aria-label="Toggle navigation menu"
                >
                  KORZI
                </button>
              </div>

              {/* Right: User / Cart / Search */}
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 p-2"
                  aria-label="User"
                >
                  <User className="w-5 h-5" />
                </button>

                <button
                  onClick={openDrawer}
                  className="relative text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 p-2"
                  aria-label="Cart"
                >
                  <Handbag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-black text-xs font-heading rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                <button
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 p-2"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>
        </div>
      )}

      {/* === SIDEBAR === */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[var(--background)] z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0 w-80 md:w-[15vw]' : '-translate-x-full w-80 md:w-[15vw]'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link to="/" className="no-underline" onClick={closeSidebar}>
            <img src="/logo-horizontal.png" alt="Korzi Logo" className="h-16 w-auto" />
          </Link>
          <button
            onClick={closeSidebar}
            className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 p-1"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-6 space-y-6 overflow-y-auto h-[calc(100%-4rem)]">
          <div className="space-y-4">
            <Link to="/" className={getLinkClasses('/')} onClick={closeSidebar}>
              <Home className="w-5 h-5" />
              <span>HOME</span>
            </Link>
            <Link to="/logs" className={getLinkClasses('/logs')} onClick={closeSidebar}>
              <FileText className="w-5 h-5" />
              <span>LOGS</span>
            </Link>
            <Link to="/shop" className={getLinkClasses('/shop')} onClick={closeSidebar}>
              <ShoppingBagIcon className="w-5 h-5" />
              <span>SHOP</span>
            </Link>
            <Link to="/more" className={getLinkClasses('/comming-soon')} onClick={closeSidebar}>
              <MoreVertical className="w-5 h-5" />
              <span>MORE</span>
            </Link>
          </div>

          <div className="pt-6 space-y-4">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 bg-[var(--primary)]/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[var(--background)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--foreground)] truncate font-body">
                        {customer?.displayName || customer?.email || 'User'}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] truncate font-body">
                        {customer?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    closeSidebar();
                  }}
                  className="flex items-center gap-3 py-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 w-full text-left font-body"
                >
                  <User className="w-5 h-5" />
                  <span>SIGN OUT</span>
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className={getLinkClasses('/signin')}
                onClick={closeSidebar}
              >
                <User className="w-5 h-5" />
                <span>SIGN IN</span>
              </Link>
            )}
          </div>
        </nav>
      </aside>

      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* === MAIN CONTENT === */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-[15vw]' : ''
        }`}
      >
        {/* Add padding to push content below fixed header */}
        <div className={`${isSidebarOpen ? 'pt-0' : 'pt-[110px]'}`}>
          <Outlet />
        </div>
      </main>

      {/* === CART DRAWER === */}
      <CartDrawer />
    </div>
  );
}
