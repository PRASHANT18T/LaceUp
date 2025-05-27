// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { AuthContext } from '../context/AuthContext';
import { fetchOrders } from '../services/api';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the user’s past orders on mount
  useEffect(() => {
    if (user) {
      fetchOrders(user.id)
        .then(res => setOrders(res.data))
        .catch(err => console.error('Error loading orders:', err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {/* User Details */}
        <section className="mb-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phoneNo || '—'}</p>
            </div>
            <div>
              <p><span className="font-medium">Address 1:</span> {user.address1 || '—'}</p>
              <p><span className="font-medium">Address 2:</span> {user.address2 || '—'}</p>
              <p><span className="font-medium">Address 3:</span> {user.address3 || '—'}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </section>

        {/* Order History */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {loading ? (
            <p>Loading orders…</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-600">You have no past orders.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map(order => (
                <li key={order.id} className="border rounded p-4">
                  <p><span className="font-medium">Order ID:</span> {order.id}</p>
                  <p><span className="font-medium">Date:</span> {new Date(order.orderDate).toLocaleString()}</p>
                  <p><span className="font-medium">Total:</span> ₹{order.totalPrice}</p>
                  {/* You could add a “View Details” button here later */}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
