// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // const startEdit = () => setIsEditing(true);
  // const cancelEdit = () => {
  //   setIsEditing(false);
  //   setForm({
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     phoneNo: user.phoneNo || '',
  //     address1: user.address1 || '',
  //     address2: user.address2 || '',
  //     address3: user.address3 || ''
  //   });
  // };

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setForm(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSave = async () => {
  //   // TODO: call API to update user details (excluding email)
  //   // await updateUser(user.id, form);
  //   alert('Your details have been updated.');
  //   setIsEditing(false);
  // };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-6 py-10 flex-1">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          My Profile
        </h1>

        {/* Account Details */}
        <section className="mb-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Account Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {user.phoneNo || "Not provided"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address 1
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {user.address1 || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address 2
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {user.address2 || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address 3
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {user.address3 || "Not provided"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-right">
            <button
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Log Out
            </button>
          </div>
        </section>

        {/* Order History */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Order History
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading your orders…</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-600">You have not placed any orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-100 rounded-lg p-4"
                >
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">
                        Order ID:
                      </span>{" "}
                      <span className="text-gray-900">{order.id}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Date:</span>{" "}
                      <span className="text-gray-900">
                        {new Date(order.orderDate).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-lg font-bold text-indigo-600">
                      Total: ₹{order.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
