import React, { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 1) Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51RUQlEPwHVGhVsryJE8OCFqnXS4MhX8t7gmuQZyYPfzoVnKBj7W6Mcye9zxpufX2NjQmJmCbVe9nowGTAYG9d6s300ReJcsb5E');

function _CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 2) Create a Payment Intent on the backend
      const { data: { clientSecret } } = await axios.post(
        '/api/payments/create-payment-intent',
        { amount, currency: 'inr' }
      );

      // 3) Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) throw new Error(result.error.message);

      if (result.paymentIntent.status === 'succeeded') {
        // 4) Complete backend order & clear cart
        const { data: order } = await axios.post(
          `/api/payments/complete?userId=${user.id}`
        );

        // 5) Navigate to order confirmation
        navigate(`/order-confirmation/${order.id}`);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <CardElement className="mb-4 p-2 border rounded" />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? 'Processing…' : `Pay ₹${(amount )}`}
      </button>
    </form>
  );
}

export default function CheckoutForm({ amount }) {
  return (
    <Elements stripe={stripePromise}>
      <_CheckoutForm amount={amount} />
    </Elements>
  );
}
