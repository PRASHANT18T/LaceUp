// src/pages/Cart.jsx
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fetchCart, fetchOne, updateCart, removeCart } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Load cart items with product details
  useEffect(() => {
    async function loadCart() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const cartRes = await fetchCart(user.id);
        const cartItems = cartRes.data;
        const itemsWithDetails = await Promise.all(
          cartItems.map(async (item) => {
            const prodRes = await fetchOne(item.productTable.replace('_product',''), item.productId);
            const product = prodRes.data;
            return { ...item, product };
          })
        );
        setItems(itemsWithDetails);
        // calculate total
        const sum = itemsWithDetails.reduce(
          (acc, item) => acc + item.quantity * parseFloat(item.product.price),
          0
        );
        setTotal(sum);
      } catch (err) {
        console.error('Error loading cart:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, [user]);

  const handleQuantityChange = async (cartItemId, newQty) => {
    try {
      const res = await updateCart(cartItemId, { quantity: newQty });
      setItems(prev => 
        prev.map(item => item.id === cartItemId ? { ...item, quantity: res.data.quantity } : item)
      );
      // recalc total
      setTotal(prev => prev + (newQty - items.find(i => i.id === cartItemId).quantity) * parseFloat(items.find(i => i.id === cartItemId).product.price));
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      await removeCart(cartItemId);
      const removed = items.find(i => i.id === cartItemId);
      setItems(prev => prev.filter(item => item.id !== cartItemId));
      setTotal(prev => prev - removed.quantity * parseFloat(removed.product.price));
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading your cart…</p></div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow">
                  <img
                    src={item.product.mainImg}
                    alt={item.product.name}
                    className="h-24 w-24 object-cover rounded"
                  />

                  <div className="ml-4 flex-1">
                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                    <p className="text-gray-500 mb-1">Brand: {item.product.brand}</p>
                    <p className="text-indigo-600 font-bold mb-2">₹{item.product.price}</p>
                    <div className="flex items-center space-x-2">
                      <label className="text-gray-600">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                        className="w-16 border rounded px-2 py-1"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow flex justify-between items-center">
              <p className="text-2xl font-semibold">Total: ₹{total.toFixed(2)}</p>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                onClick={() => alert('Proceeding to payment gateway...')}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
