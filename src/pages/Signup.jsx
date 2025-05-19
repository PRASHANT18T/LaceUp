// Signup.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}