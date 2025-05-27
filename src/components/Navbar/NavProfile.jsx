// src/components/Navbar/NavProfile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function NavProfile({ user, onLogout }) {
  return (
    <div className="relative group flex items-center space-x-1 text-gray-700 hover:text-gray-900">
      {/* TODO: Provide `user` and `onLogout` via AuthContext */}
      <FaUserCircle className="h-6 w-6" />
      <span className="text-sm font-medium">{user?.firstName || 'Profile'}</span>

      {/* Dropdown menu—visible on hover */}
      <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          My Profile
        </Link>
        <button
          onClick={onLogout}
          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
