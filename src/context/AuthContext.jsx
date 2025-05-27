// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if present
    const stored = localStorage.getItem('laceup_user');
    return stored ? JSON.parse(stored) : null;
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('laceup_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('laceup_user');
    }
  }, [user]);

  /** Sign in existing user */
  async function signIn(credentials) {
    try {
      const response = await apiLogin(credentials);
      setUser(response.data);
      return { success: true };
    } catch (err) {
      console.error('Login failed', err);
      return { success: false, message: err.response?.data || 'Login error' };
    }
  }

  /** Register a new user */
  async function signUp(data) {
    try {
      const response = await apiSignup(data);
      setUser(response.data);
      return { success: true };
    } catch (err) {
      console.error('Signup failed', err);
      return { success: false, message: err.response?.data || 'Signup error' };
    }
  }

  /** Log out the current user */
  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

 export default AuthContext;