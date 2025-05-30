// src/components/Navbar/SearchBar.jsx
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for shoes..."
        className={`
          w-full pl-4 pr-10 py-2 rounded-full
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-colors
        `}
      />
      <button
        onClick={() => onSearch(query)}
        aria-label="Search"
        className={`
          absolute inset-y-0 right-0 flex items-center pr-3
          text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
          transition-colors
        `}
      >
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8.25" cy="8.25" r="6.25" />
          <line x1="16.75" y1="16.75" x2="12.08" y2="12.08" />
        </svg>
      </button>
    </div>
  );
}
