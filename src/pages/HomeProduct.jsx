
// src/components/HomeProduct.jsx
import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addToCart as apiAddToCart } from '../services/api';

const HomeProduct = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products?category=home');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching home products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = async (product) => {
    if (!user) return navigate('/login');
    const size = selectedSizes[product.id];
    if (!size) {
      alert('Please select a size.');
      return;
    }
    try {
      await apiAddToCart({ userId: user.id, productTable: 'home_product', productId: product.id, quantity: 1 });
      // TODO: update cart badge
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowProduct = (id) => navigate(`/products/home/${id}`);

  return (
    <div className="p-8 bg-gray-700 text-white min-h-screen">
      <motion.h2
        className="text-4xl font-extrabold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Featured Products
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {products.map(product => (
          <motion.div
            key={product.id}
            className="flex flex-col h-full border border-gray-700 rounded-2xl overflow-hidden bg-gray-800 shadow-lg"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.04, boxShadow: '0 10px 20px rgba(0,0,0,0.6)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            viewport={{ once: true }}
          >
            <img
              src={product.mainImg}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-semibold mb-2 truncate hover:text-indigo-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 mb-1">Brand: {product.brand}</p>
              <p className="text-green-400 font-bold mb-2 text-xl">₹{product.price}</p>

              <select
                className="w-full mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={selectedSizes[product.id] || ''}
                onChange={e => handleSizeChange(product.id, e.target.value)}
              >
                <option value="" disabled>Select Size</option>
                {product.sizes.split(',').map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>

              <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                {product.shortDescription || product.short_description}
              </p>

              <div className="mt-auto flex space-x-4">
                <motion.button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-medium transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  onClick={() => handleShowProduct(product.id)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-medium transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  View
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeProduct;

