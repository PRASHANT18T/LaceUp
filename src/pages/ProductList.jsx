// src/pages/ProductList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    if (!user) return navigate('/login');
    try {
      await apiAddToCart({
        userId: user.id,
        productTable: `${category}_product`,
        productId: product.id,
        quantity: 1
      });
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  const handleShow = (id) => navigate(`/products/${category}/${id}`);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar dark />

      <main className="container mx-auto px-6 py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold capitalize">
            {category} Shoes
          </h1>
          {searchQuery && (
            <p className="text-gray-400">Filtering by “{searchQuery}”</p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <motion.div
              className="inline-block w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ loop: Infinity, duration: 1 }}
            />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products match.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {products.map(prod => (
              <motion.div
                key={prod.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <ProductCard
                  title={prod.name}
                  price={prod.price}
                  img={prod.mainImg}
                  onAddToCart={() => handleAdd(prod)}
                  onShow={() => handleShow(prod.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer dark />
    </div>
  );
}
