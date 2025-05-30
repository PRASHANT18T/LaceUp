// src/components/Navbar/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="LaceUp Home"
      className="
        flex items-center space-x-2 p-2 rounded-lg transition-colors
        bg-white hover:bg-gray-100
        
      "
    >
      {/* Replace with your actual logo image or SVG */}
      <img
        src="/src/assets/images/logo.png"
        alt="LaceUp Logo"
        className="h-10 w-auto"
      />
   
    </Link>
  );
}

