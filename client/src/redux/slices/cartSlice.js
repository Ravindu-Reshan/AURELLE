import { createSlice } from '@reduxjs/toolkit';

// Cart is stored per-user (keyed by user ID), so different accounts on the
// same browser never see each other's cart. Logged-out visitors share a
// single "guest" cart.
const getCartStorageKey = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo?._id ? `cartItems_${userInfo._id}` : 'cartItems_guest';
};

const loadCartFromStorage = () => {
  const stored = localStorage.getItem(getCartStorageKey());
  return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (items) => {
  localStorage.setItem(getCartStorageKey(), JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.product === newItem.product);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        // Default size/color if not specified when adding
        state.items.push({
          size: 'M',
          color: 'Black',
          ...newItem,
        });
      }
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.items.find((i) => i.product === product);
      if (item) {
        item.quantity = quantity;
      }
      saveCartToStorage(state.items);
    },
    updateVariant: (state, action) => {
      const { product, size, color } = action.payload;
      const item = state.items.find((i) => i.product === product);
      if (item) {
        if (size !== undefined) item.size = size;
        if (color !== undefined) item.color = color;
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.product !== action.payload);
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    // Re-reads the cart for whichever user is currently logged in (or guest).
    // Dispatched whenever the logged-in user changes, so switching accounts
    // on the same browser loads the correct person's cart instead of the
    // previous person's leftover items.
    reloadCart: (state) => {
      state.items = loadCartFromStorage();
    },
  },
});

export const { addToCart, updateQuantity, updateVariant, removeFromCart, clearCart, reloadCart } =
  cartSlice.actions;
export default cartSlice.reducer;
