import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

 function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Optionally fetch order details if you want more info
    // For now, just display the orderId
    setOrder({ id: orderId });
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading confirmation…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-10">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h1>
          <p className="text-gray-700 mb-6">Your order <span className="font-semibold">#{order.id}</span> has been placed.</p>
          <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
export default OrderConfirmation;