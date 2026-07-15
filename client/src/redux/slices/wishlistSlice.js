import { createSlice } from '@reduxjs/toolkit';

// Wishlist is stored per-user (keyed by user ID), same reasoning as the cart:
// different accounts on the same browser must never share a wishlist.
const getWishlistStorageKey = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo?._id ? `wishlistItems_${userInfo._id}` : 'wishlistItems_guest';
};

const loadWishlistFromStorage = () => {
  const stored = localStorage.getItem(getWishlistStorageKey());
  return stored ? JSON.parse(stored) : [];
};

const saveWishlistToStorage = (items) => {
  localStorage.setItem(getWishlistStorageKey(), JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.product === product.product);

      if (exists) {
        state.items = state.items.filter((item) => item.product !== product.product);
      } else {
        state.items.push(product);
      }
      saveWishlistToStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.product !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
    // Re-reads the wishlist for whichever user is currently logged in (or guest)
    reloadWishlist: (state) => {
      state.items = loadWishlistFromStorage();
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist, reloadWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
