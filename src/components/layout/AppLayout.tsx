'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Home, FileText, Package, BookOpen, User, Globe, Grid3X3 } from 'lucide-react';
import AnnouncementBar from '../AnnouncementBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Helper function to determine if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  // Helper function to get link classes
  const getLinkClasses = (href: string) => {
    const baseClasses = "flex items-center gap-3 py-2 transition-colors duration-200";
    const activeClasses = "text-[var(--primary)] font-medium";
    const inactiveClasses = "text-[var(--foreground)] hover:text-[var(--primary)]";
    
    return `${baseClasses} ${isActive(href) ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      {/* Announcement Bar */}
      <AnnouncementBar />
      
      {/* Header */}
      <header className="fixed top-8 sm:top-10 left-0 right-0 z-40 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/logo-horizontal.png"
                alt="Korzi Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleSidebar}
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 p-2"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Right: Search */}
          <div className="flex items-center">
            <button
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 p-2"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-[var(--background)] border-r border-[var(--border)] z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <img
              src="/logo-horizontal.png"
              alt="Korzi Logo"
              className="h-10 w-auto"
            />
          </div>
          <button
            onClick={closeSidebar}
            className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 p-1"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-6 space-y-6">
          <div className="space-y-4">
            <Link
              to="/"
              className={getLinkClasses('/')}
              onClick={closeSidebar}
            >
              <Home className="w-5 h-5" />
              <span>HOME</span>
            </Link>
            <Link
              to="/logs"
              className={getLinkClasses('/logs')}
              onClick={closeSidebar}
            >
              <FileText className="w-5 h-5" />
              <span>LOGS</span>
            </Link>
            <Link
              to="/comming-soon"
              className={getLinkClasses('/comming-soon')}
              onClick={closeSidebar}
            >
              <BookOpen className="w-5 h-5" />
              <span>GUIDES</span>
            </Link>
          </div>

          <div className="border-t border-[var(--border)] pt-6 space-y-4">
            <Link
              to="/signin"
              className={getLinkClasses('/signin')}
              onClick={closeSidebar}
            >
              <User className="w-5 h-5" />
              <span>SIGN IN</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-28 sm:pt-32 md:pt-28 lg:pt-28">
        {children}
      </main>
    </div>
  );
}