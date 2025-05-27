// src/components/CategorySection/WomanCategory.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function WomanCategory() {
  return (
    <Link to="/products?category=woman" className="block">
      <div className="relative overflow-hidden rounded-lg shadow-md group">
        <img
          src="/assets/images/banner/woman.jpg"
          alt="woman Shoes"
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">Woman</span>
        </div>
      </div>
    </Link>
  );
}
