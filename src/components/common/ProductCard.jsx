// src/components/common/ProductCard.jsx
import React from 'react';

export default function ProductCard({ title, price, img, onAddToCart, onShow }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 truncate">{title}</h3>
        <p className="text-indigo-600 font-bold mb-2">₹{price}</p>
        <div className="mt-auto space-y-2">
          <button
            onClick={onAddToCart}
            className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={onShow}
            className="w-full border border-indigo-500 text-indigo-500 py-1 rounded hover:bg-indigo-50 transition"
          >
            Show Product
          </button>
        </div>
      </div>
    </div>
  );
}
