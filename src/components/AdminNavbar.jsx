import React from 'react';
// Import React Router components
import { NavLink, useLocation } from 'react-router-dom';

// Import icons 
import { 
  LayoutDashboard, 
  Briefcase, 
  Package, 
  FileText, 
  LogOut 
} from 'lucide-react';

export default function AdminNavbar() {
  // Use useLocation hook from react-router-dom to get current path
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo/Home link using NavLink */}
        <NavLink 
          to="/admin/dashboard"
          className="text-2xl font-bold flex items-center gap-2"
        >
          <LayoutDashboard size={24} />
          <span>Admin Panel</span>
        </NavLink>
        
        {/* Navigation Links using NavLink */}
        <div className="flex space-x-6">
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
            to="/admin/login" 
            className={({ isActive }) => 
              `flex items-center gap-2 ${isActive ? 'text-red-500' : 'text-red-300 hover:text-red-100 transition-colors'}`
            }
          >
            <LogOut size={18} />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}