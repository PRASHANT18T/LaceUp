import React from 'react';

export default function HomeMainBanner() {
  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg my-6">
      <img
        src="/src/assets/images/HomeMainBanner.jpg" // Change this path to your actual image
        alt="Main Banner"
        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />

      {/* Optional: Text overlay (if needed in future) */}
      {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold">Welcome to LaceUp!</h1>
      </div> */}
    </div>
  );
}
