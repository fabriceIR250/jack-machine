import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../admin/supabaseClient';
import { FaUserCircle, FaBriefcase, FaTachometerAlt, FaFileAlt, FaPhoneAlt } from 'react-icons/fa';

const UsersNavbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Left Section - Dashboard */}
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <Link to="/user/dashboard" className="flex items-center hover:text-blue-600">
          <FaTachometerAlt className="mr-2" />
          Dashboard
        </Link>
      </div>

      {/* Right Section - Links and Profile */}
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <Link to="/users/jobs" className="flex items-center hover:text-blue-600">
          <FaBriefcase className="mr-2" />
          Jobs
        </Link>
        <Link to="/users/result" className="flex items-center hover:text-blue-600">
          <FaFileAlt className="mr-2" />
          Result
        </Link>
        <Link to="contact" className="flex items-center hover:text-blue-600">
          <FaPhoneAlt className="mr-2" />
          Contact Us
        </Link>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
            <FaUserCircle className="text-3xl text-blue-600" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-md">
              <div className="p-4 border-b text-sm text-gray-700">
                {user?.email || 'Loading...'}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UsersNavbar;
