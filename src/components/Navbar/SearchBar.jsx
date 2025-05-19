// SearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
      <input
        type="text"
        placeholder="Search for shoes, brands..."
        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}