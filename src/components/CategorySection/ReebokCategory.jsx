// src/components/CategorySection/ReebokCategory.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ReebokCategory() {
  return (
    <Link to="/products?category=reebok" className="block">
      <div className="relative overflow-hidden rounded-lg shadow-md group">
        <img
          src="https://th.bing.com/th/id/OIP.vaeUgl8kSE2xlslH5os1oQHaHa?w=768&h=768&rs=1&pid=ImgDetMain"
          alt="reebok Shoes"
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">Reebok</span>
        </div>
      </div>
    </Link>
  );
}
