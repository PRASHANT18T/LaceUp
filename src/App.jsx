

// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Cart from './pages/Cart';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import OrderConfirmation from './pages/OrderConfirmation';


 function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Home />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Shopping cart */}
            <Route path="/cart" element={<Cart />} />

            {/* Products listing by category & optional search */}
            <Route path="/products" element={<ProductList />} />

            {/* Product detail view */}
            <Route path="/products/:category/:id" element={<ProductDetails />} />

            {/* User profile & order history */}
            <Route path="/profile" element={<Profile />} />

             {/* Order confirmation */}
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

            {/* Fallback to home for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />

              

          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;