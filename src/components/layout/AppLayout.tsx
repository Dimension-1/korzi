'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Search, Home, FileText, Package, BookOpen, User, Globe } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-horizontal.png"
                alt="Korzi Logo"
                width={120}
                height={30}
                className="h-10 w-auto"
                priority
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
            <Image
              src="/logo-horizontal.png"
              alt="Korzi Logo"
              width={100}
              height={25}
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
              href="/"
              className="flex items-center gap-3 text-[var(--primary)] py-2 font-medium"
              onClick={closeSidebar}
            >
              <Home className="w-5 h-5" />
              <span>HOME</span>
            </Link>

            <Link
              href="/logs"
              className="flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 py-2"
              onClick={closeSidebar}
            >
              <FileText className="w-5 h-5" />
              <span>LOGS</span>
            </Link>

            <Link
              href="/shop"
              className="flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 py-2"
              onClick={closeSidebar}
            >
              <Package className="w-5 h-5" />
              <span>PRODUCTS</span>
            </Link>

            <Link
              href="/coming-soon"
              className="flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 py-2"
              onClick={closeSidebar}
            >
              <BookOpen className="w-5 h-5" />
              <span>GUIDES</span>
            </Link>
          </div>

          <div className="border-t border-[var(--border)] pt-6 space-y-4">
            <Link
              href="/signin"
              className="flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 py-2"
              onClick={closeSidebar}
            >
              <User className="w-5 h-5" />
              <span>SIGN IN</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-20 md:pt-24 lg:pt-32">
        {children}
      </main>
    </div>
  );
}
