// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fetchOne } from '../services/api';

export default function ProductDetails() {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOne(category, id)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product details:', err))
      .finally(() => setLoading(false));
  }, [category, id]);

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
    <div className="flex flex-col min-h-screen">
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
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.brand}</p>
            <p className="text-2xl text-indigo-600 font-semibold mb-4">₹{product.price}</p>
            <p className="text-gray-700 mb-4">{product.longDescription}</p>

            {/* Size & Color */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Select Size:</label>
              <select
                className="px-3 py-2 border rounded"
                // TODO: wire to state and Add to Cart
              >
                <option value="">Choose size</option>
                {product.sizes.split(',').map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">Color: {product.color}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                // TODO: handleAddToCart(product)
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => window.history.back()}
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
