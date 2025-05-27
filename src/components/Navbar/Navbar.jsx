// src/components/Navbar/Navbar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Logo from './Logo';
import HomeIcon from './HomeIcon';
import SearchBar from './SearchBar';
import NavCart from './NavCart';
import NavSignIn from './NavSignIn';
import NavLogin from './NavLogin';
import NavProfile from './NavProfile';
import { fetchCart } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

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
    <nav className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
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
          <NavProfile user={user} onLogout={signOut} />
        )}
      </div>
    </nav>
  );
}
