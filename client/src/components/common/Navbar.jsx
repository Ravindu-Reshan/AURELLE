import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown, User } from 'lucide-react';
import { logout } from '../../redux/slices/authSlice';

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const isAdminUser = userInfo?.role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate('/');
  };

  // Close the profile dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'text-heading hover:text-primary-600'
    }`;

  return (
    <nav className="bg-surface shadow-sm sticky top-0 z-20">
      <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-between h-16 gap-4">
        {/* Brand — kept exactly as-is */}
        <Link
          to="/"
          className="text-3xl font-bold text-primary-600 shrink-0"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          AURELLE
        </Link>

        {/* Centered nav links — admins see only Home + Admin, everywhere */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>

          {isAdminUser ? (
            <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          ) : (
            <>
              <NavLink to="/wishlist" className={navLinkClass}>
                Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                Shopping Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </NavLink>
              {userInfo && (
                <NavLink to="/orders" className={navLinkClass}>My Orders</NavLink>
              )}
            </>
          )}
        </div>

        {/* Profile / auth */}
        <div className="flex items-center gap-5 shrink-0">
          {userInfo ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-medium text-heading hover:text-primary-600 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                  <User size={16} />
                </span>
                {isAdminUser ? `Admin ${userInfo.name}` : userInfo.name}
                <ChevronDown size={16} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-surface border border-cardBorder rounded-md shadow-md py-1 text-sm">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-heading hover:bg-background"
                  >
                    My Profile
                  </Link>
                  {!isAdminUser && (
                    <Link
                      to="/orders"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-heading hover:bg-background"
                    >
                      My Orders
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-background"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-heading hover:text-primary-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-primary-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
