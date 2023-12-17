// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        // Check if the item is already in the cart
        const existingItem = state.cart.find(item => item.ID === action.payload.ID);
  
        if (existingItem) {
          // If the item is already in the cart, update the quantity
          const updatedCart = state.cart.map(item =>
            item.ID === action.payload.ID ? { ...item, quantity: item.quantity + 1 } : item
          );

          return { ...state, cart: updatedCart };
        } else {
          // If the item is not in the cart, add it with quantity 1
          return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        }
  
      case 'REMOVE_ITEM':
        return { ...state, cart: state.cart.filter((item) => item.ID !== action.payload) };
  
      case 'CLEAR_CART':
        return { ...state, cart: [] };
  
      default:
        return state;
    }
  };
  

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
  return context;
};

export { CartProvider, useCart };
