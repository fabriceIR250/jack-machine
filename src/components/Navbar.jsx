import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Users, Mail } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold tracking-tight flex items-center">
            <span className="bg-white text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">J</span>
            Jack Machine
          </NavLink>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink 
              to="/" 
              className="py-2 px-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              activeClassName="bg-blue-700 font-medium"
            >
              <Home size={18} className="mr-2" />
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className="py-2 px-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              activeClassName="bg-blue-700 font-medium"
            >
              <Briefcase size={18} className="mr-2" />
              Services
            </NavLink>
            <NavLink 
              to="/careers" 
              className="py-2 px-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              activeClassName="bg-blue-700 font-medium"
            >
              <Users size={18} className="mr-2" />
              Careers
            </NavLink>
            <NavLink 
              to="/contact" 
              className="bg-white text-blue-700 font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300 flex items-center"
              activeClassName="bg-blue-50"
            >
              <Mail size={18} className="mr-2" />
              Contact
            </NavLink>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink 
              to="/" 
              className="block py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
              activeClassName="bg-blue-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="mr-2" />
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className="block py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
              activeClassName="bg-blue-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Briefcase size={18} className="mr-2" />
              Services
            </NavLink>
            <NavLink 
              to="/careers" 
              className="block py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
              activeClassName="bg-blue-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={18} className="mr-2" />
              Careers
            </NavLink>
            <NavLink 
              to="/contact" 
              className="block bg-white text-blue-700 font-medium py-2 px-4 rounded-md hover:bg-blue-50 flex items-center"
              activeClassName="bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail size={18} className="mr-2" />
              Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;