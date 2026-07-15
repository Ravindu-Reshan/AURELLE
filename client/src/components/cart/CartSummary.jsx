import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

export default function CartSummary({ items }) {
  const navigate = useNavigate();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6 h-fit">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
      <div className="flex justify-between text-sm text-body mb-2">
        <span>Items ({itemCount})</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between font-semibold text-heading border-t pt-3 mt-3">
        <span>Total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <button
        disabled={items.length === 0}
        onClick={() => navigate('/checkout')}
        className="w-full mt-5 bg-primary-600 text-white py-2.5 rounded-full font-semibold hover:bg-primary-700 disabled:bg-cardBorder"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
