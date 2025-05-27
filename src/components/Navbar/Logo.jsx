// src/components/Navbar/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2" aria-label="LaceUp Home">
      {/* Replace with your actual logo image or SVG */}
      <img
        src="/assets/images/logo.png"
        alt="LaceUp Logo"
        className="h-10 w-auto"
      />
      <span className="text-2xl font-bold text-gray-800">
        LaceUp
      </span>
    </Link>
  );
}
