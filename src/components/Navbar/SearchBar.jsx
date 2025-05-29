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
        className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={() => onSearch(query)}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        aria-label="Search"
      >
   {/* Search Icon */}
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
  viewBox="0 0 20 20"
  fill="none"
  stroke="currentColor"
  aria-hidden="true"
  focusable="false"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    d="M8.25 14.25A6.25 6.25 0 1 0 8.25 1.75a6.25 6.25 0 0 0 0 12.5zm8.5 1.5l-4.67-4.67"
  />
</svg>
      </button>
    </div>
  );
}
