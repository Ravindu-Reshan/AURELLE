import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { formatPrice } from '../../utils/formatPrice';
import { isOutOfStock } from '../../utils/stockStatus';

export default function CategorySection({ category, products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleBuy = (product) => {
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
    navigate('/cart');
  };

  const handleWishlist = (product) => {
    dispatch(
      toggleWishlist({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        countInStock: product.stock,
      })
    );
    navigate('/wishlist');
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-heading mb-4">{category}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product) => {
          const isWishlisted = wishlistItems.some((item) => item.product === product._id);
          const outOfStock = isOutOfStock(product);

          return (
            <div
              key={product._id}
              className="bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-primary-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-heading truncate">{product.name}</h3>
                <span className="text-primary-600 font-semibold">
                  {formatPrice(product.price)}
                </span>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleBuy(product)}
                    disabled={outOfStock}
                    className="flex-1 bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-primary-700 disabled:bg-cardBorder disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5"
                  >
                    {outOfStock ? (
                      'Out of Stock'
                    ) : (
                      <>
                        Buy <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWishlist(product)}
                    className="w-10 h-10 shrink-0 rounded-full border border-cardBorder flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <span className={isWishlisted ? 'text-red-500' : 'text-body'}>
                      {isWishlisted ? '♥' : '♡'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
