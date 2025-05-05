import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../admin/supabaseClient';
import { 
  FaUserCircle, 
  FaBriefcase, 
  FaTachometerAlt, 
  FaFileAlt, 
  FaPhoneAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const BubbleAnimation = () => {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createBubble = () => {
      const size = Math.random() * 20 + 5;
      const posX = Math.random() * 100;
      const animationDuration = `${Math.random() * 6 + 4}s`;
      
      const newBubble = {
        id: Date.now() + Math.random(),
        size,
        left: `${posX}%`,
        animationDuration,
        opacity: Math.random() * 0.15 + 0.05,
        delay: `${Math.random() * 2}s`
      };
      
      setBubbles(prev => [...prev.slice(-15), newBubble]);
      
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, parseFloat(animationDuration) * 1000);
    };
    
    const initialTimeout = setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        setTimeout(createBubble, i * 300);
      }
    }, 500);
    
    const interval = setInterval(createBubble, 2500);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: bubble.left,
            bottom: '-20px',
            opacity: bubble.opacity,
            animation: `floatUp ${bubble.animationDuration} ease-in ${bubble.delay} forwards`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: ${bubbles[0]?.opacity || 0.1};
          }
          90% {
            opacity: ${bubbles[0]?.opacity || 0.1};
          }
          100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const UsersNavbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayEmail = user?.email 
    ? user.email.length > 20 
      ? `${user.email.substring(0, 15)}...` 
      : user.email
    : 'Loading...';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg z-50 border-b border-blue-500/20">
        <BubbleAnimation />
        
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 relative z-10">
            {/* Left Section - Dashboard */}
            <div className="flex items-center space-x-4 md:space-x-8">
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
              
              <NavLink 
                to="/users/dashboard" 
                className={({ isActive }) => `flex items-center group transition-all ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}
              >
                <div className="bg-white/10 group-hover:bg-white/20 p-2 rounded-lg transition-all">
                  <FaTachometerAlt className="text-xl text-blue-300" />
                </div>
                <span className="ml-3 font-semibold hidden sm:inline">Dashboard</span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink 
                to="/users/jobs" 
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
              >
                <FaBriefcase className="mr-2" />
                <span>Jobs</span>
              </NavLink>
              
              <NavLink 
                to="/users/result" 
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
              >
                <FaFileAlt className="mr-2" />
                <span>Results</span>
              </NavLink>
              
              <NavLink 
                to="/users/contact" 
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
              >
                <FaPhoneAlt className="mr-2" />
                <span>Contact</span>
              </NavLink>

              {/* Profile Dropdown */}
              <div className="relative ml-4" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
                    <FaUserCircle className="text-xl text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white/90">{displayEmail}</span>
                    <div className="flex items-center text-xs text-white/60">
                      <span>Account</span>
                      <FaChevronDown className={`ml-1 text-xs transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden animate-fadeIn border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">{user?.email || 'Loading...'}</p>
                      <p className="text-xs text-gray-500 mt-1">Free Plan</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm flex items-center hover:bg-gray-50 text-red-500 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Profile Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="p-2 rounded-full hover:bg-white/10 transition-all"
              >
                <FaUserCircle className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-blue-800 shadow-lg z-40 animate-slideDown"
          >
            <div className="container mx-auto px-4 py-3">
              <NavLink 
                to="/users/jobs" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg mb-2 transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
              >
                <FaBriefcase className="mr-3" />
                <span>Jobs</span>
              </NavLink>
              
              <NavLink 
                to="/users/result" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg mb-2 transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
              >
                <FaFileAlt className="mr-3" />
                <span>Results</span>
              </NavLink>
              
              <NavLink 
                to="users/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
              >
                <FaPhoneAlt className="mr-3" />
                <span>Contact</span>
              </NavLink>
            </div>
          </div>
        )}

        {/* Mobile Dropdown */}
        {dropdownOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white rounded-lg shadow-xl w-48 overflow-hidden animate-fadeIn border border-gray-100 z-40">
            <div className="p-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-700 truncate">{user?.email || 'Loading...'}</p>
              <p className="text-xs text-gray-500 mt-1">Free Plan</p>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm flex items-center hover:bg-gray-50 text-red-500 transition-colors"
            >
              <FaSignOutAlt className="mr-3" />
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* Spacer div */}
      <div className="h-16"></div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default UsersNavbar;