// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      alert('Please log in to add items to cart.');
      navigate('/login');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    try {
      const payload = {
        userId: user.id,
        productTable: `${category}_product`,
        productId: product.id,
        quantity: 1
      };
      await apiAddToCart(payload);
      alert('Added to cart!');
      // TODO: refresh cart badge
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add to cart.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product details…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <img
              src={product.mainImg}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow"
            />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[product.imgSecond, product.imgThird, product.imgFourth].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${product.name} view ${idx + 2}`}
                  className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-75"
                  onClick={() => setProduct(prev => ({ ...prev, mainImg: src }))}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-2">Brand: {product.brand}</p>
            <p className="text-2xl text-indigo-600 font-semibold mb-4">₹{product.price}</p>
            <p className="text-gray-700 mb-4">{product.longDescription}</p>

            {/* Size Selector */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Select Size:</label>
              <select
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Choose size</option>
                {product.sizes.split(',').map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-gray-600">Color: {product.color}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
