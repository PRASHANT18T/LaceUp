// src/components/HomeProductGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HomeProductGrid = () => {
  // Replace these URLs/paths with your actual images
  const imgSources = [
    'https://img.freepik.com/free-photo/close-up-legs-red-keds-lying-grass_176420-55091.jpg?...', // div1
    'https://img.freepik.com/free-photo/close-up-person-wearing-futuristic-sneakers_23-2151005696.jpg?...', // div2
    'https://img.freepik.com/free-photo/view-shoe-rack-with-storage-space-footwear_23-2150839894.jpg?...', // div3
    'https://img.freepik.com/premium-photo/people-legs-shoes-row-with-against-wall-fashion-style-outfit-streets-new-york-group-friends-together-with-footwear-trends-casual-wear-chill-relax-outdoor_590464-350759.jpg?...', // div4
    'https://img.freepik.com/free-photo/crop-couple-kissing-pier_23-2147738349.jpg?...', // div5
    'https://img.freepik.com/free-photo/woman-shopping-bags-floor-with-red-background_23-2148302849.jpg?...', // div6
    'https://img.freepik.com/free-photo/close-up-futuristic-sneakers_23-2151005656.jpg?...', // div7
  ];

  return (
    <div className="p-4 bg-gradient-to-br from-gray700 to-gray-700 min-h-screen">
      {/* Animated heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        “Where Comfort Meets Cool”
      </motion.h2>

      {/**
       * - h-[600px] fixes the grid’s total height to 600px on md+ screens.
       * - On small screens (sm:), use h-auto so it expands naturally.
       * - grid-cols-5 & grid-rows-5 => 5×5 layout on md+, falls back to 2-column on sm.
       * - gap-2 => 0.5rem (8px).
       */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-rows-[repeat(5,_minmax(0,_1fr))] gap-2 sm:h-[500px] md:h-[600px]">
        {/* div1: spans col 1–2, row 1–2 */}
        <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 group">
          <img
            src={imgSources[0]}
            alt="Product 1"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-lg font-semibold">Red Keds</span>
          </div>
        </div>

        {/* div2: starts at col 3, spans rows 1–4 */}
        <div className="col-start-3 row-span-4 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 group">
          <img
            src={imgSources[1]}
            alt="Product 2"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-lg font-semibold">Futuristic Sneakers</span>
          </div>
        </div>

        {/* div3: starts at col 1, row 3; spans col 1–2, row 3–4 */}
        <div className="col-start-1 col-span-2 row-start-3 row-span-2 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 group">
          <img
            src={imgSources[2]}
            alt="Product 3"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-lg font-semibold">Shoe Rack View</span>
          </div>
        </div>

        {/* div4: starts at col 1, row 5; spans col 1–3 */}
        <div className="col-start-1 col-span-3 row-start-5 row-span-1 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 group">
          <img
            src={imgSources[3]}
            alt="Product 4"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-lg font-semibold">Fashion Street Style</span>
          </div>
        </div>

        {/* div5: starts at col 4, row 1; spans row 1–2 */}
        <div className="col-start-4 row-start-1 row-span-2 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 group">
          <img
            src={imgSources[4]}
            alt="Product 5"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-lg font-semibold">Couple at Pier</span>
          </div>
        </div>

        {/* div6: starts at col 5, spans all 5 rows */}
        <div className="col-start-5 row-start-1 row-span-5 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 group">
          <img
            src={imgSources[5]}
            alt="Product 6"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-lg font-semibold">Shopping Vibes</span>
          </div>
        </div>

        {/* div7: starts at col 4, row 3; spans rows 3–5 */}
        <div className="col-start-4 row-start-3 row-span-3 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 group">
          <img
            src={imgSources[6]}
            alt="Product 7"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-lg font-semibold">Futuristic Kicks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductGrid;
