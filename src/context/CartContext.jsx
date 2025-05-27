// src/context/CartContext.jsx

import React, { createContext, useContext, useReducer } from "react";

// 🧠 Initial cart state
const initialState = {
  cartItems: [],
};

// 📊 Reducer to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // 📦 Update quantity if item exists
        const updatedItems = [...state.cartItems];
        updatedItems[existingIndex].quantity += action.payload.quantity || 1;
        return { ...state, cartItems: updatedItems };
      } else {
        // ➕ Add new item
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

// 🔄 Context setup
const CartContext = createContext();

// 🌍 Provider for wrapping app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 🛒 Add item to cart
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // ❌ Remove item from cart
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // 🧹 Clear all
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🎣 Hook for ease
export const useCart = () => useContext(CartContext);
