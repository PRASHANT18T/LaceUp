// src/components/CategorySection/PumaCategory.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PumaCategory() {
  return (
    <Link to="/products?category=puma" className="block">
      <div className="relative overflow-hidden rounded-lg shadow-md group">
        <img
          src="https://static.vecteezy.com/system/resources/previews/022/424/423/non_2x/puma-logo-editorial-free-vector.jpg"
          alt="puma Shoes"
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">Puma</span>
        </div>
      </div>
    </Link>
  );
}
