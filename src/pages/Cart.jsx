// src/pages/Cart.jsx
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fetchCart, updateCart, removeCart } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart items for the logged‑in user
  useEffect(() => {
    if (user) {
      fetchCart(user.id)
        .then(res => setItems(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleQuantityChange = (cartItemId, newQty) => {
    updateCart(cartItemId, newQty)
      .then(res => {
        setItems(prev =>
          prev.map(item => (item.id === cartItemId ? res.data : item))
        );
      })
      .catch(console.error);
  };

  const handleRemove = (cartItemId) => {
    removeCart(cartItemId)
      .then(() => {
        setItems(prev => prev.filter(item => item.id !== cartItemId));
      })
      .catch(console.error);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center border rounded-lg p-4 shadow-sm"
              >
                {/* TODO: fetch product image and details by calling fetchOne(item.productTable, item.productId) */}
                <img
                  src={item.main_img}
                  alt={item.productTable}
                  className="h-24 w-24 object-cover rounded"
                />

                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-semibold">{item.productTable}</h2>
                  <p className="text-gray-500">Quantity:</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            {/* TODO: Show total price and Checkout button */}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
