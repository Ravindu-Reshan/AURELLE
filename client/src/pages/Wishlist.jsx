import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { formatPrice } from '../utils/formatPrice';

export default function Wishlist() {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleMoveToCart = (item) => {
    dispatch(
      addToCart({
        product: item.product,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        countInStock: item.countInStock,
      })
    );
    dispatch(removeFromWishlist(item.product));
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-body mb-4">Your wishlist is empty.</p>
          <Link to="/" className="text-primary-600 font-medium hover:underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {items.map((item) => (
            <div
              key={item.product}
              className="bg-surface rounded-lg shadow-sm overflow-hidden"
            >
              <Link to={`/products/${item.product}`}>
                <div className="aspect-square overflow-hidden bg-primary-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <h3 className="font-medium text-heading truncate">{item.name}</h3>
                <span className="text-primary-600 font-semibold">
                  {formatPrice(item.price)}
                </span>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-primary-600 text-white text-sm font-semibold py-2 rounded-full hover:bg-primary-700"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.product))}
                    className="px-3 border border-cardBorder text-sm rounded-full hover:bg-background text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
