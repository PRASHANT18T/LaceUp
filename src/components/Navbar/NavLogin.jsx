// src/components/Navbar/NavLogin.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

export default function NavLogin() {
  const { user } = useContext(AuthContext);

  // If user is authenticated, show profile or logout instead
  if (user) {
    return (
      <Link
        to="/profile"
        aria-label="My Profile"
        className={
          `flex items-center space-x-1 p-2 rounded-lg transition-colors
           text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100
           dark:text-gray-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`
        }
      >
        {/* Replace with user icon */}
        <FaSignInAlt className="h-5 w-5" />
        <span className="text-sm font-medium">Profile</span>
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      aria-label="Log In"
      className={
        `flex items-center space-x-1 p-2 rounded-lg transition-colors
         text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100
         dark:text-gray-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`
      }
    >
      <FaSignInAlt className="h-5 w-5" />
      <span className="text-sm font-medium">Log In</span>
    </Link>
  );
}
