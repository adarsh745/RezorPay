import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe, MessageCircle, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TechStore
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Premium gadgets and electronics delivered to your doorstep with speed and security.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg hover:text-blue-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg hover:text-blue-600 transition-colors">
                <Info className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Shop</h3>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Laptops</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Smartphones</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Accessories</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-blue-600 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Subscribe to get special offers and news.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TechStore. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="/refund-policy" className="hover:text-blue-600 transition-colors">Refunds</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
