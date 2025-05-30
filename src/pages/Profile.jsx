
// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { AuthContext } from "../context/AuthContext";
import { fetchOrders } from "../services/api";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNo: user?.phoneNo || "",
    address1: user?.address1 || "",
    address2: user?.address2 || "",
    address3: user?.address3 || "",
  });

  useEffect(() => {
    if (user) {
      fetchOrders(user.id)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error loading orders:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar dark />

      <main className="container mx-auto px-6 py-10 flex-1">
        <motion.h1
          className="text-4xl font-extrabold mb-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          My Profile
        </motion.h1>

        {/* Account Details */}
        <motion.section
          className="mb-10 bg-gray-800 rounded-2xl shadow-xl p-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">
            Account Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Name
                </label>
                <p className="mt-1 text-lg text-white">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <p className="mt-1 text-lg text-white">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Phone
                </label>
                <p className="mt-1 text-lg text-white">
                  {user.phoneNo || "Not provided"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Address 1
                </label>
                <p className="mt-1 text-lg text-white">
                  {user.address1 || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Address 2
                </label>
                <p className="mt-1 text-lg text-white">
                  {user.address2 || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Address 3
                </label>
                <p className="mt-1 text-lg text-white">
                  {user.address3 || "Not provided"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-right">
            <motion.button
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Log Out
            </motion.button>
          </div>
        </motion.section>

        {/* Order History */}
        <motion.section
          className="bg-gray-800 rounded-2xl shadow-xl p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">
            Order History
          </h2>
          {loading ? (
            <p className="text-gray-400">Loading your orders…</p>
          ) : orders.length === 0 ? (
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You have not placed any orders yet.
            </motion.p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-700 rounded-xl p-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium text-gray-300">
                        Order ID:
                      </span>{' '}
                      <span className="text-white">{order.id}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-300">
                        Date:
                      </span>{' '}
                      <span className="text-white">
                        {new Date(order.orderDate).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-lg font-bold text-green-400">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>

      <Footer dark />
    </div>
  );
}
