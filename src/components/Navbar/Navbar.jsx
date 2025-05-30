// src/components/Navbar/Navbar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import HomeIcon from './HomeIcon';
import SearchBar from './SearchBar';
import NavCart from './NavCart';
import NavSignIn from './NavSignIn';
import NavLogin from './NavLogin';
import NavProfile from './NavProfile';
import { fetchCart } from '../../services/api';

export default function Navbar({ dark }) {
  const { user, signOut } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Load cart count whenever user changes
  useEffect(() => {
    if (user) {
      fetchCart(user.id)
        .then(res => setCartCount(res.data.length))
        .catch(() => setCartCount(0));
    } else {
      setCartCount(0);
    }
  }, [user]);

  function handleSearch(query) {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  }

  return (
    <nav className={
      `flex items-center justify-between px-4 py-2 h-18 transition-colors backdrop-blur-md
       ${dark ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-800'} shadow-md`
    }>
      {/* Left: Logo and Home */}
      <div className="flex items-center space-x-4">
        <Logo />
        <HomeIcon />
      </div>

      {/* Center: Search */}
      <div className="flex-1 mx-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right: Cart & Auth */}
      <div className="flex items-center space-x-6">
        <NavCart cartCount={cartCount} />

        {!user && (
          <>
            <NavSignIn />
            <NavLogin />
          </>
        )}

        {user && (
          <NavProfile onLogout={signOut} />
        )}
      </div>
    </nav>
  );
}