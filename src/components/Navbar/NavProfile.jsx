// src/components/Navbar/NavProfile.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

export default function NavProfile({ onLogout }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative group flex items-center space-x-1 p-2 rounded-lg transition-colors
                       text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100
                       dark:text-gray-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
      <FaUserCircle className="h-6 w-6" />
      <span className="text-sm font-medium">{user?.firstName || 'Profile'}</span>

      {/* Dropdown menu—visible on hover */}
      <div className=" z-999 absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg
                         opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                         transition-opacity
                         dark:bg-gray-800 dark:border-gray-700">
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
        >
          My Profile
        </Link>
        {/* <button
          onClick={onLogout}
          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Log Out
        </button> */}
      </div>
    </div>
  );
}