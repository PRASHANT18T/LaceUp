
// src/pages/Cart.jsx
import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fetchCart, fetchOne, updateCart, removeCart } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

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
            const prodRes = await fetchOne(
              item.productTable.replace('_product',''),
              item.productId
            );
            return { ...item, product: prodRes.data };
          })
        );
        setItems(itemsWithDetails);
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
      setItems(prev => prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: res.data.quantity } : item
      ));
      const changed = items.find(i => i.id === cartItemId);
      setTotal(prev => prev + (newQty - changed.quantity) * parseFloat(changed.product.price));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ loop: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar dark />

      <main className="container mx-auto px-6 py-8 flex-1">
        <h1 className="text-4xl font-extrabold mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <motion.p
            className="text-center text-gray-400"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {items.map(item => (
              <motion.div
                key={item.id}
                className="flex items-center bg-gray-800 p-4 rounded-2xl shadow-lg"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <img
                  src={item.product.mainImg}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover rounded-lg"
                />

                <div className="ml-4 flex-1">
                  <h2 className="text-2xl font-semibold mb-1">{item.product.name}</h2>
                  <p className="text-gray-400 mb-1">Brand: {item.product.brand}</p>
                  <p className="text-green-400 font-bold mb-2">₹{item.product.price}</p>
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-400">Qty:</label>
                    <motion.input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                      className="w-16 border border-gray-700 rounded px-2 py-1 bg-gray-900 text-white"
                      whileFocus={{ scale: 1.05 }}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                  whileHover={{ scale: 1.1 }}
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}

            {/* Total and Checkout */}
            <motion.div
              className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-xl flex justify-between items-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <p className="text-3xl font-bold">Total: ₹{total.toFixed(2)}</p>
              <motion.button
                className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition-all"
                whileHover={{ scale: 1.05 }}
                onClick={() => alert('Proceeding to payment gateway...')}
              >
                Proceed to Payment
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </main>

      <Footer dark />
    </div>

  );
}