// src/components/Navbar/NavCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function NavCart({ cartCount = 0 }) {
  return (
    <Link
      to="/cart"
      className="relative text-gray-700 hover:text-gray-900"
      aria-label="View Cart"
    >
      <FaShoppingCart className="h-6 w-6" />
      {cartCount > 0 && (
        <span
          className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center"
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
}
