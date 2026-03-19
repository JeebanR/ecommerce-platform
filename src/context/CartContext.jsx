import React, { createContext, useContext, useReducer, useCallback } from 'react';

// ─── INITIAL STATE ────────────────────────────────────────────
const initialState = {
  items: [],
  wishlist: [],
  user: null,
  toasts: [],
};

// ─── REDUCER ─────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_TO_CART': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }

    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };

    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: Math.max(1, action.payload.qty) }
            : i
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_WISHLIST': {
      const inWL = state.wishlist.find(i => i.id === action.payload.id);
      return {
        ...state,
        wishlist: inWL
          ? state.wishlist.filter(i => i.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };

    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };

    default:
      return state;
  }
}

// ─── CONTEXT ─────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Derived values
  const cartCount   = state.items.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const cartDelivery = cartSubtotal > 0 ? (cartSubtotal >= 499 ? 0 : 40) : 0;
  const cartTotal   = cartSubtotal + cartDelivery;
  const cartSavings = state.items.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);

  // Actions
  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ type: 'ADD_TOAST', payload: { message: `${product.name.slice(0, 30)} added to cart`, icon: '🛒', variant: 'success' } });
  }, []);

  const removeFromCart  = useCallback((id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }), []);
  const updateQty       = useCallback((id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } }), []);
  const clearCart       = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const toggleWishlist  = useCallback((product) => dispatch({ type: 'TOGGLE_WISHLIST', payload: product }), []);
  const setUser         = useCallback((user) => dispatch({ type: 'SET_USER', payload: user }), []);
  const logout          = useCallback(() => dispatch({ type: 'LOGOUT' }), []);
  const removeToast     = useCallback((id) => dispatch({ type: 'REMOVE_TOAST', payload: id }), []);

  const isInWishlist = useCallback((id) => state.wishlist.some(i => i.id === id), [state.wishlist]);
  const isInCart     = useCallback((id) => state.items.some(i => i.id === id), [state.items]);
  const getCartItem  = useCallback((id) => state.items.find(i => i.id === id), [state.items]);

  return (
    <CartContext.Provider value={{
      ...state,
      cartCount, cartSubtotal, cartDelivery, cartTotal, cartSavings,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist, isInCart, getCartItem,
      setUser, logout, removeToast,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
