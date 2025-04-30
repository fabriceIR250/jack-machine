import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../admin/supabaseClient';
import { FaUserCircle } from 'react-icons/fa';

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
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <Link to="/careers" className="hover:text-blue-600">Jobs</Link>
        <Link to="/application" className="hover:text-blue-600">Apply</Link>
        <Link to="/result" className="hover:text-blue-600">Result</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
      </div>

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
    </nav>
  );
};

export default UsersNavbar;
