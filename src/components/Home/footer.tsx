import { Link } from 'react-router-dom';
import { Camera, Youtube, Phone, Mail,Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* SHOP ALL Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">SHOP ALL</h3>
            <ul className="space-y-3">
              <li><Link to="/products/fermented-yeast" className="hover:text-white transition-colors duration-200">Fermented Yeast</Link></li>
              <li><Link to="/products/protein" className="hover:text-white transition-colors duration-200">Protein</Link></li>
              <li><Link to="/products/protein-chips" className="hover:text-white transition-colors duration-200">Protein Chips</Link></li>
              <li><Link to="/products/chocolate-wafer" className="hover:text-white transition-colors duration-200">Chocolate Wafer</Link></li>
              <li><Link to="/products/chocolate-peanut" className="hover:text-white transition-colors duration-200">Chocolate Peanut</Link></li>
              <li><Link to="/products/butter-wafer" className="hover:text-white transition-colors duration-200">Butter Wafer</Link></li>
              <li><Link to="/products/strawberry-wafer" className="hover:text-white transition-colors duration-200">Strawberry Wafer</Link></li>
              <li><Link to="/products/cheese-wafer" className="hover:text-white transition-colors duration-200">Cheese Wafer</Link></li>
              <li><Link to="/products/variety-box" className="hover:text-white transition-colors duration-200">Variety Box</Link></li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Connect Now</Link></li>
            </ul>
          </div>

          {/* SUPPORT & POLICY Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">SUPPORT & POLICY</h3>
            <ul className="space-y-3">
              <li><Link to="/refer-earn" className="hover:text-white transition-colors duration-200">Refer & Earn</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/refund-returns" className="hover:text-white transition-colors duration-200">Refund & Returns</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors duration-200">Shipping Policy</Link></li>
              <li><Link to="/employment" className="hover:text-white transition-colors duration-200">Employment Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
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
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Camera className="w-5 h-5 text-black" />
              </a>
              <a 
                href="https://youtube.com/korzi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="w-5 h-5 text-black" />
              </a>
            </div>
          </div>

          {/* GET IN TOUCH Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wide">GET IN TOUCH</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+918655450110</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>support@korzi.toys</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-black/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-black/80 mb-4 md:mb-0">
              © 2024 Korzi. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-black/80 flex items-center gap-1">Made with <Heart fill="red" color="red" className="w-4 h-4" /> for the young</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}