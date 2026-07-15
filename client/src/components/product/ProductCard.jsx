import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { formatPrice } from '../../utils/formatPrice';
import { isOutOfStock } from '../../utils/stockStatus';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.product === product._id);
  const outOfStock = isOutOfStock(product);

  const handleAddToCart = (e) => {
    // Stop the click from also triggering the card's Link navigation
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        countInStock: product.stock,
      })
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      toggleWishlist({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        countInStock: product.stock,
      })
    );
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group block relative"
    >
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-surface/90 shadow flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Toggle wishlist"
      >
        <span className={isWishlisted ? 'text-red-500' : 'text-body'}>
          {isWishlisted ? '♥' : '♡'}
        </span>
      </button>

      <div className="aspect-square overflow-hidden bg-primary-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-body uppercase tracking-wide">{product.category}</p>
        <h3 className="font-medium text-heading truncate mt-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-primary-600 font-semibold">{formatPrice(product.price)}</span>
          {outOfStock ? (
            <span className="text-xs text-red-500">Out of stock</span>
          ) : (
            <span className="text-xs text-green-600">In stock</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="w-full mt-3 bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-primary-700 disabled:bg-cardBorder disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5"
        >
          {added ? 'Added ✓' : (
            <>
              Add to Cart <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
