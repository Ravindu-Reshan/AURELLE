import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import { reloadCart } from './redux/slices/cartSlice';
import { reloadWishlist } from './redux/slices/wishlistSlice';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';

import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';

export default function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const currentUserId = userInfo?._id ?? null;
  const lastUserId = useRef(currentUserId);

  // Whenever the logged-in account changes (login, logout, or switching to a
  // different account), reload the cart/wishlist for that specific account
  // instead of showing whatever the previous person on this browser had.
  useEffect(() => {
    if (lastUserId.current !== currentUserId) {
      dispatch(reloadCart());
      dispatch(reloadWishlist());
      lastUserId.current = currentUserId;
    }
  }, [currentUserId, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <ManageOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
