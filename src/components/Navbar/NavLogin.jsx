// src/components/Navbar/NavLogin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

export default function NavLogin() {
  return (
    <Link
      to="/login"
      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
      aria-label="Log In"
      // TODO: hide or replace this link if user is already authenticated (use AuthContext)
    >
      <FaSignInAlt className="h-5 w-5" />
      <span className="text-sm font-medium">Log In</span>
    </Link>
  );
}
