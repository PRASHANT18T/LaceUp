// src/components/Navbar/NavCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function NavCart({ cartCount = 0 }) {
  return (
    <Link
      to="/cart"
      aria-label="View Cart"
      className={`
        relative p-2 rounded-lg transition-colors
        text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100
        dark:text-gray-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700
      `}
    >
      <FaShoppingCart className="h-6 w-6" />
      {cartCount > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            bg-red-500 text-white text-xs font-bold
            rounded-full h-5 w-5
            flex items-center justify-center
            shadow-md
          "
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
}

