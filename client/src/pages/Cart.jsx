import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

export default function Cart() {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-body mb-4">Your cart is empty.</p>
          <Link to="/" className="text-primary-600 font-medium hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-surface rounded-lg shadow-sm p-6">
            {items.map((item) => (
              <CartItem key={item.product} item={item} />
            ))}
          </div>
          <CartSummary items={items} />
        </div>
      )}
    </div>
  );
}
