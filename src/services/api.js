// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',                   // Vite proxies this to your Spring Boot /api
  headers: { 'Content-Type': 'application/json' },
});

// Auth
export const login      = creds  => api.post('/auth/login', creds);
export const signup     = data   => api.post('/auth/signup', data);

// Products
export const fetchAll   = category => api.get(`/products?category=${category}`);
export const fetchOne   = (category, id) => api.get(`/products/${category}/${id}`);

// Cart
export const addToCart  = item    => api.post('/cart/add', item);
export const fetchCart  = userId  => api.get(`/cart/${userId}`);
export const updateCart = (cartItemId, body) => api.put(`/cart/${cartItemId}`, body);
export const removeCart = cartItemId  => api.delete(`/cart/${cartItemId}`);

// Orders
export const placeOrder = userId  => api.post(`/order/place?userId=${userId}`);
export const fetchOrders= userId  => api.get(`/order/${userId}`);

// ========== Payments ==========
export const createPaymentIntent = payload => api.post('/payments/create-payment-intent', payload);
export const completePayment      = userId  => api.post(`/payments/complete?userId=${userId}`);

export default api;
