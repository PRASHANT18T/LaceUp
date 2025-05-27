// src/components/Navbar/HomeIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export default function HomeIcon() {
  return (
    <Link
      to="/"
      className="text-gray-700 hover:text-gray-900 flex items-center"
      aria-label="Go to Home"
    >
      <FaHome className="h-6 w-6" />
    </Link>
  );
}
