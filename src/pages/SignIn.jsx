// src/pages/SignIn.jsx
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function SignIn() {
  const { signUp } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '', password: '', firstName: '', lastName: '', phoneNo: '', address1: '', address2: '', address3: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    const result = await signUp(formData);
    setLoading(false);
    if (result.success) navigate('/'); else setError(result.message || 'Signup failed');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar dark />
      <main className="flex-1 flex items-center justify-center">
        <motion.div
          className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center">Sign Up</h1>

          {error && (
            <motion.div
              className="mb-4 text-red-500 text-sm text-center"
              initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            >{error}</motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-1 text-gray-300">First Name</label>
                <input name="firstName" required value={formData.firstName} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-1 text-gray-300">Last Name</label>
                <input name="lastName" required value={formData.lastName} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <label className="block mb-1 text-gray-300">Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <label className="block mb-1 text-gray-300">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <label className="block mb-1 text-gray-300">Phone Number</label>
              <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <label className="block mb-1 text-gray-300">Address Line 1</label>
              <input name="address1" value={formData.address1} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <label className="block mb-1 text-gray-300">Address Line 2</label>
                <input name="address2" value={formData.address2} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <label className="block mb-1 text-gray-300">Address Line 3</label>
                <input name="address3" value={formData.address3} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </motion.div>
            </div>

            <motion.button type="submit" disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold transition-all"
              whileHover={{ scale: 1.02 }}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:underline">Log In</Link>
          </p>
        </motion.div>
      </main>
      <Footer dark />
    </div> 
  );
}
