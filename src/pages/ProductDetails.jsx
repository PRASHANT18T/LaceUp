import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fetchOne, addToCart as apiAddToCart } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ProductDetails() {
  const { category, id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetchOne(category, id)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product details:', err))
      .finally(() => setLoading(false));
  }, [category, id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedSize) return;
    try {
      const payload = { userId: user.id, productTable: `${category}_product`, productId: product.id, quantity: 1 };
      await apiAddToCart(payload);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <motion.div
          className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ loop: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400">
        <p>Oops, product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar dark />
      <main className="container mx-auto px-6 py-10 flex-1">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div>
            <motion.img
              src={product.mainImg}
              alt={product.name}
              className="w-full h-130 rounded-2xl shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => {} /* could open modal */}
            />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[product.imgSecond, product.imgThird, product.imgFourth].map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt={`${product.name} view ${idx + 2}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                  whileHover={{ opacity: 0.8 }}
                  onClick={() => setProduct(prev => ({ ...prev, mainImg: src }))}
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
            <motion.h1 className="text-4xl font-bold mb-4" initial={{ x: -50 }} animate={{ x: 0 }}>
              {product.name}
            </motion.h1>
            <p className="text-gray-400 mb-2">Brand: {product.brand}</p>
            <p className="text-3xl font-extrabold text-green-400 mb-6">₹{product.price}</p>
            <p className="text-gray-300 mb-6 leading-relaxed">{product.longDescription}</p>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Select Size:</label>
              <motion.select
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
                className="w-full border border-gray-700 rounded px-4 py-3 bg-gray-900"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="" disabled>Choose size</option>
                {product.sizes.split(',').map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </motion.select>
            </div>

            <p className="text-gray-400 mb-6">Color: {product.color}</p>

            <div className="flex space-x-4">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
                whileHover={{ scale: 1.05 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl transition"
                whileHover={{ scale: 1.03 }}
              >
                Go Back
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer dark />
    </div>
  );
}
