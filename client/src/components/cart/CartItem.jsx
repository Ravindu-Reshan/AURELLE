import { useDispatch } from 'react-redux';
import { updateQuantity, updateVariant, removeFromCart } from '../../redux/slices/cartSlice';
import { formatPrice } from '../../utils/formatPrice';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Grey'];

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="py-4 border-b">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />

        <div className="flex-1 min-w-0">
          <p className="font-medium text-heading truncate">{item.name}</p>
          <p className="text-sm text-body">{formatPrice(item.price)}</p>
        </div>

        <span className="w-20 text-right font-medium text-heading">
          {formatPrice(item.price * item.quantity)}
        </span>

        <button
          onClick={() => dispatch(removeFromCart(item.product))}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3 pl-20">
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-body">Size</label>
          <select
            value={item.size || 'M'}
            onChange={(e) =>
              dispatch(updateVariant({ product: item.product, size: e.target.value }))
            }
            className="border border-cardBorder rounded-md px-2 py-1 text-sm"
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <label className="text-xs text-body">Color</label>
          <select
            value={item.color || 'Black'}
            onChange={(e) =>
              dispatch(updateVariant({ product: item.product, color: e.target.value }))
            }
            className="border border-cardBorder rounded-md px-2 py-1 text-sm"
          >
            {COLORS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <label className="text-xs text-body">Qty</label>
          <input
            type="number"
            min="1"
            max={item.countInStock}
            value={item.quantity}
            onChange={(e) =>
              dispatch(updateQuantity({ product: item.product, quantity: Number(e.target.value) }))
            }
            className="w-16 border border-cardBorder rounded-md px-2 py-1 text-sm text-center"
          />
        </div>
      </div>
    </div>
  );
}
