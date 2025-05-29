// src/components/HomeProduct.jsx
import React, { useEffect, useState, useContext } from 'react';
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
    if (!user) {
      alert('Please log in to add items to cart.');
      navigate('/login');
      return;
    }
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    try {
      const payload = {
        userId: user.id,
        productTable: 'home_product',
        productId: product.id,
        quantity: 1
      };
      await apiAddToCart(payload);
      alert('Added to cart!');
      // TODO: update NavCart badge via context or refetch
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add to cart.');
    }
  };

  const handleShowProduct = (productId) => {
    navigate(`/products/home/${productId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center"> Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition-all bg-amber-50">
            <img
              src={product.mainImg}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
            <p className="text-gray-700 font-bold mb-1">Price: ₹{product.price}</p>
            <p className="text-gray-500 mb-1">Color: {product.color}</p>
            <div className="mb-2">
              <label htmlFor={`size-${product.id}`} className="text-sm text-gray-600">Select Size:</label>
              <select
                id={`size-${product.id}`}
                className="ml-2 p-1 border rounded"
                onChange={(e) => handleSizeChange(product.id, e.target.value)}
                value={selectedSizes[product.id] || ''}
              >
                <option value="">Choose size</option>
                {product.sizes.split(',').map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-500 mb-2">{product.short_description}</p>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleShowProduct(product.id)}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Show Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProduct;
