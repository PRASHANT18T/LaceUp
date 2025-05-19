// Navbar.jsx
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavButtons from './NavButtons';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <SearchBar />
          <NavButtons />
        </div>
      </div>
    </nav>
  );
}