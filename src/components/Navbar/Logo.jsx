// Logo.jsx
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/logo.png" 
        alt="LaceUp Logo"
        className="h-8 w-8"
      />
      <span className="ml-2 text-xl font-bold text-gray-800">LaceUp</span>
    </Link>
  );
}