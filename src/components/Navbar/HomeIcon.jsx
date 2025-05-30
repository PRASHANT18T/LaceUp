// src/components/Navbar/HomeIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export default function HomeIcon() {
  return (
    <Link
      to="/"
      aria-label="Go to Home"
      className="flex items-center p-2 rounded-lg transition-colors 
                  text-gray-700 hover:text-gray-900 
                  dark:text-gray-300 dark:hover:text-white 
                  bg-white hover:bg-gray-100 
                  dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <FaHome className="h-6 w-6" />
    </Link>
  );
}