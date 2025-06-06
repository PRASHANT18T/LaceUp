// src/components/CategorySection/ManCategory.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ManCategory() {
  return (
    <Link to="/products?category=man" className="block">
      <div className="relative overflow-hidden rounded-lg shadow-md group">
        <img
          src="https://th.bing.com/th/id/OIP.wdFXU3Z60rpaINB4REsrUQHaHa?w=214&h=214&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="man Shoes"
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">Man</span>
        </div>
      </div>
    </Link>
  );
}
