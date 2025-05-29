// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fetchAll } from '../services/api';
 import ProductCard from '../components/common/ProductCard'; // ensure this exists or adjust path

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'home';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchAll(category)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  }, [category]);

  const handleShowProduct = (id) => {
    // Navigate to product details page for this category and id
    navigate(`/products/${category}/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {category} Shoes
        </h1>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                img={product.mainImg}
                onAddToCart={() => {/* TODO: integrate addToCart logic */}}
                onShow={() => handleShowProduct(product.id)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
