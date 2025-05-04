import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FileText,
  LogOut,
  MessageCircle,
} from 'lucide-react';
import { supabase } from '../pages/admin/supabaseClient'; // Make sure to import supabase client

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavLink
          to="/admin/dashboard"
          className="text-2xl font-bold flex items-center gap-2"
        >
          <LayoutDashboard size={24} />
          <span>Admin Panel</span>
        </NavLink>

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
    </nav>
  );
}