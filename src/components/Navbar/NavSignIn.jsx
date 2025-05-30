// src/components/Navbar/NavSignIn.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

export default function NavSignIn() {
  const { user } = useContext(AuthContext);

  // If already signed in, direct to dashboard or hide link
  if (user) {
    return (
      <Link
        to="/dashboard"
        aria-label="Dashboard"
        className={
          `flex items-center space-x-1 p-2 rounded-lg transition-colors
           text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100
           dark:text-gray-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`
        }
      >
        <FaUserPlus className="h-5 w-5" />
        <span className="text-sm font-medium">Dashboard</span>
      </Link>
    );
  }

  return (
    <Link
      to="/signin"
      aria-label="Sign Up"
      className={
        `flex items-center space-x-1 p-2 rounded-lg transition-colors
         text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100
         dark:text-gray-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`
      }
    >
      <FaUserPlus className="h-5 w-5" />
      <span className="text-sm font-medium">Sign Up</span>
    </Link>
  );
}
