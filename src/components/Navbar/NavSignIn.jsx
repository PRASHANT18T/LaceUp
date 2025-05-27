// src/components/Navbar/NavSignIn.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

export default function NavSignIn() {
  return (
    <Link
      to="/signin"
      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
      aria-label="Sign In"
      // TODO: hide this link or redirect if user is already authenticated (use AuthContext)
    >
      <FaUserPlus className="h-5 w-5" />
      <span className="text-sm font-medium">Sign In</span>
    </Link>
  );
}
