import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ title, price, img, onAddToCart, onShow }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4 flex-1 flex flex-col text-zinc-800 dark:text-zinc-100">
        <h3 className="text-lg font-semibold mb-2 truncate">{title}</h3>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-3">₹{price}</p>
        
        <div className="mt-auto space-y-2">
          <motion.button
            whileHover={{ y: -2 }}
            className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition-all"
            onClick={onAddToCart}
          >
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            className="w-full border border-indigo-500 text-indigo-500 dark:border-indigo-400 dark:text-indigo-400 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-zinc-800 transition-all"
            onClick={onShow}
          >
            Show Product
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
