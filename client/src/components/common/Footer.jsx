import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t mt-12">
      <div className="max-w-[1600px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3
            className="font-bold text-primary-600 mb-3 text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            AURELLE
          </h3>
          <p className="text-sm text-body leading-relaxed">
            Discover trendy clothing at affordable prices for every occasion.

          </p>
        </div>

        <div>
          <h4 className="font-semibold text-heading mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-sm text-body">
            <li><Link to="/" className="hover:text-primary-600">All Products</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary-600">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-primary-600">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-heading mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-sm text-body">
            <li><Link to="/profile" className="hover:text-primary-600">My Profile</Link></li>
            <li><Link to="/orders" className="hover:text-primary-600">Order History</Link></li>
            <li><Link to="/login" className="hover:text-primary-600">Login / Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-heading mb-3 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-body">
            <li>support@aurelle.com</li>
            <li>+94 11 234 5678</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-[1600px] mx-auto px-4 py-4 text-center text-xs text-body">
          © {new Date().getFullYear()} AURELLE — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
