import React from 'react';
import { 
  Home, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Facebook,
  Shield, 
  FileText,
  ArrowUp
} from 'lucide-react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">J</div>
              <h2 className="text-xl font-bold">Jack Machine</h2>
            </div>
            <p className="text-blue-100 mb-4">
              Innovative solutions for modern businesses. We specialize in cutting-edge technology and exceptional service.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Home size={16} className="mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <ArrowUp size={12} className="mr-2 transform rotate-45" />
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <ArrowUp size={12} className="mr-2 transform rotate-45" />
                  Services
                </a>
              </li>
              <li>
                <a href="/careers" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <ArrowUp size={12} className="mr-2 transform rotate-45" />
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <ArrowUp size={12} className="mr-2 transform rotate-45" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Mail size={16} className="mr-2" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-blue-300" />
                <span className="text-blue-100">123 Innovation Street, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-blue-300" />
                <span className="text-blue-100">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-blue-300" />
                <span className="text-blue-100">info@jackmachine.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-blue-100 mb-4">Stay updated with our latest news and announcements</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-blue-800 border border-blue-700 p-2 rounded-l-md flex-grow text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-r-md transition duration-300"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0 text-blue-100">
              &copy; {new Date().getFullYear()} Jack Machine. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                <Shield size={14} className="mr-2" />
                Privacy Policy
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                <FileText size={14} className="mr-2" />
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 p-3 rounded-full shadow-lg transition duration-300"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}

export default Footer;