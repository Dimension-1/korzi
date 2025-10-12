import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* SHOP ALL Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">SHOP ALL</h3>
            <ul className="space-y-3">
              <li><Link to="/products/fermented-yeast" className="hover:text-[var(--primary)] transition-colors duration-200">Fermented Yeast</Link></li>
              <li><Link to="/products/protein" className="hover:text-[var(--primary)] transition-colors duration-200">Protein</Link></li>
              <li><Link to="/products/protein-chips" className="hover:text-[var(--primary)] transition-colors duration-200">Protein Chips</Link></li>
              <li><Link to="/products/chocolate-wafer" className="hover:text-[var(--primary)] transition-colors duration-200">Chocolate Wafer</Link></li>
              <li><Link to="/products/chocolate-peanut" className="hover:text-[var(--primary)] transition-colors duration-200">Chocolate Peanut</Link></li>
              <li><Link to="/products/butter-wafer" className="hover:text-[var(--primary)] transition-colors duration-200">Butter Wafer</Link></li>
              <li><Link to="/products/strawberry-wafer" className="hover:text-[var(--primary)] transition-colors duration-200">Strawberry Wafer</Link></li>
              <li><Link to="/products/cheese-wafer" className="hover:text-[var(--primary)] transition-colors duration-200">Cheese Wafer</Link></li>
              <li><Link to="/products/variety-box" className="hover:text-[var(--primary)] transition-colors duration-200">Variety Box</Link></li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-[var(--primary)] transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--primary)] transition-colors duration-200">Connect Now</Link></li>
            </ul>
          </div>

          {/* SUPPORT & POLICY Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">SUPPORT & POLICY</h3>
            <ul className="space-y-3">
              <li><Link to="/refer-earn" className="hover:text-[var(--primary)] transition-colors duration-200">Refer & Earn</Link></li>
              <li><Link to="/terms" className="hover:text-[var(--primary)] transition-colors duration-200">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-[var(--primary)] transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/refund-returns" className="hover:text-[var(--primary)] transition-colors duration-200">Refund & Returns</Link></li>
              <li><Link to="/shipping" className="hover:text-[var(--primary)] transition-colors duration-200">Shipping Policy</Link></li>
              <li><Link to="/employment" className="hover:text-[var(--primary)] transition-colors duration-200">Employment Policy</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--primary)] transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>

          {/* FOLLOW ALONG Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">FOLLOW ALONG</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/korzi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary)] transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/korzi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary)] transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* GET IN TOUCH Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">GET IN TOUCH</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+918655450110</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>support@korzi.toys</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/80 mb-4 md:mb-0">
              © 2024 Korzi. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80">Made with ❤️ for the young</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}