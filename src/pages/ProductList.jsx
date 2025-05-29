// src/pages/ProductList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fetchAll, addToCart as apiAddToCart } from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { AuthContext } from '../context/AuthContext';

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const category = searchParams.get('category') || 'home';
  const searchQuery = (searchParams.get('search') || '').toLowerCase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAll(category)
      .then(res => {
        let data = res.data;
        if (searchQuery) {
          data = data.filter(p => {
            const q = searchQuery;
            // match name, brand, color, or price
            return (
              p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.color.toLowerCase().includes(q) ||
              p.price.toString().includes(q)
            );
          });
        }
        setProducts(data);
      })
      .catch(err => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  }, [category, searchQuery]);

  const handleAdd = async (product) => {
    if (!user) {
      alert('Login required to add to cart');
      navigate('/login');
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
      alert('Added to cart');
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert('Failed to add to cart');
    }
  };

  const handleShow = (id) => navigate(`/products/${category}/${id}`);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold capitalize">{category} Shoes</h1>
          {searchQuery && (
            <p className="text-gray-700">Filtering by “{searchQuery}”</p>
          )}
        </div>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products match.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(prod => (
              <ProductCard
                key={prod.id}
                title={prod.name}
                price={prod.price}
                img={prod.mainImg}
                onAddToCart={() => handleAdd(prod)}
                onShow={() => handleShow(prod.id)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
