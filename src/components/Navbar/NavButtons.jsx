// NavButtons.jsx
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
// import { CartContext } from '../../context/CartContext';
import { UserCircleIcon, ShoppingCartIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function NavButtons() {
  // Uncomment and use your CartContext when ready
  // const { cartItems } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic
  const cartItems = []; // Temporary placeholder to avoid errors

  return (
    <div className="flex items-center space-x-4">
      <Link to="/" className="p-2 hover:text-blue-600">
        <HomeIcon className="h-6 w-6" />
      </Link>
      
      <Link to="/cart" className="relative p-2 hover:text-blue-600">
        <ShoppingCartIcon className="h-6 w-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </Link>

      {isLoggedIn ? (
        <Link to="/profile" className="p-2 hover:text-blue-600">
          <UserCircleIcon className="h-6 w-6" />
        </Link>
      ) : (
        <div className="flex space-x-2">
          <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}