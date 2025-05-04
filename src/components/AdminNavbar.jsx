import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FileText,
  LogOut,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '../pages/admin/supabaseClient'; // Make sure to import supabase client

// Bubble animation component
const BubbleEffect = () => {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createBubble = () => {
      const size = Math.random() * 20 + 5; // Smaller bubbles for navbar
      const posX = Math.random() * 100;
      
      const newBubble = {
        id: Date.now(),
        size,
        left: `${posX}%`,
        animationDuration: `${Math.random() * 6 + 4}s`,
        opacity: Math.random() * 0.15 + 0.05 // Very subtle opacity
      };
      
      setBubbles(prev => [...prev, newBubble]);
      
      // Remove bubble after animation completes
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, (parseFloat(newBubble.animationDuration) * 1000));
    };
    
    // Create initial bubbles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBubble(), i * 300);
    }
    
    // Create new bubbles periodically
    const interval = setInterval(createBubble, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: bubble.left,
            bottom: '-10px',
            opacity: bubble.opacity,
            animation: `floatUp ${bubble.animationDuration} ease-in forwards`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: ${bubbles[0]?.opacity || 0.1};
          }
          90% {
            opacity: ${bubbles[0]?.opacity || 0.1};
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem('adminAuth');
      
      // Redirect to login page
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <>
      {/* Fixed navbar - added fixed top-0 left-0 right-0 and z-50 for proper positioning */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 shadow-lg z-50">
        {/* Bubble animation background */}
        <BubbleEffect />
        
        <div className="container mx-auto px-4">
          {/* Mobile view */}
          <div className="flex items-center justify-between">
            <NavLink
              to="/admin/dashboard"
              className="text-2xl font-bold flex items-center gap-2 group z-10 relative"
            >
              <LayoutDashboard size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="group-hover:text-blue-100 transition-colors">Admin Panel</span>
            </NavLink>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none z-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 lg:space-x-6 z-10 relative">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `hover:text-white transition-colors flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-300'}`
                }
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/admin/services"
                className={({ isActive }) =>
                  `hover:text-white transition-colors flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-300'}`
                }
              >
                <Package size={18} />
                <span>Services</span>
              </NavLink>

              <NavLink
                to="/admin/careers"
                className={({ isActive }) =>
                  `hover:text-white transition-colors flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-300'}`
                }
              >
                <Briefcase size={18} />
                <span>Careers</span>
              </NavLink>

              <NavLink
                to="/admin/applications"
                className={({ isActive }) =>
                  `hover:text-white transition-colors flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-300'}`
                }
              >
                <FileText size={18} />
                <span>Applications</span>
              </NavLink>

              <NavLink
                to="/admin/messages"
                className={({ isActive }) =>
                  `hover:text-white transition-colors flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-300'}`
                }
              >
                <MessageCircle size={18} />
                <span>Messages</span>
              </NavLink>

              {/* Changed NavLink to button for logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-300 hover:text-red-100 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu - Added fixed positioning instead of static */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed left-0 right-0 bg-gray-900 py-3 px-4 shadow-lg animate-fadeIn z-10">
              <div className="flex flex-col space-y-3">
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `hover:text-white transition-colors flex items-center gap-2 py-1 px-2 ${isActive ? 'text-white font-medium bg-gray-800/50 rounded' : 'text-gray-300'}`
                  }
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </NavLink>

                <NavLink
                  to="/admin/services"
                  className={({ isActive }) =>
                    `hover:text-white transition-colors flex items-center gap-2 py-1 px-2 ${isActive ? 'text-white font-medium bg-gray-800/50 rounded' : 'text-gray-300'}`
                  }
                >
                  <Package size={18} />
                  <span>Services</span>
                </NavLink>

                <NavLink
                  to="/admin/careers"
                  className={({ isActive }) =>
                    `hover:text-white transition-colors flex items-center gap-2 py-1 px-2 ${isActive ? 'text-white font-medium bg-gray-800/50 rounded' : 'text-gray-300'}`
                  }
                >
                  <Briefcase size={18} />
                  <span>Careers</span>
                </NavLink>

                <NavLink
                  to="/admin/applications"
                  className={({ isActive }) =>
                    `hover:text-white transition-colors flex items-center gap-2 py-1 px-2 ${isActive ? 'text-white font-medium bg-gray-800/50 rounded' : 'text-gray-300'}`
                  }
                >
                  <FileText size={18} />
                  <span>Applications</span>
                </NavLink>

                <NavLink
                  to="/admin/messages"
                  className={({ isActive }) =>
                    `hover:text-white transition-colors flex items-center gap-2 py-1 px-2 ${isActive ? 'text-white font-medium bg-gray-800/50 rounded' : 'text-gray-300'}`
                  }
                >
                  <MessageCircle size={18} />
                  <span>Messages</span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-300 hover:text-red-100 transition-colors py-1 px-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Add a spacer div to prevent content from being hidden behind the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}