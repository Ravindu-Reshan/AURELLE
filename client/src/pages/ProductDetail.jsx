import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/common/Loader';
import { formatPrice } from '../utils/formatPrice';
import { isOutOfStock } from '../utils/stockStatus';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        countInStock: product.stock,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading || !product) return <Loader />;

  const outOfStock = isOutOfStock(product);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-primary-50 rounded-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-xs text-body uppercase tracking-wide">{product.category}</p>
          <h1 className="text-2xl font-bold text-heading mt-1">{product.name}</h1>
          <p className="text-2xl text-primary-600 font-semibold mt-3">{formatPrice(product.price)}</p>
          <p className="text-body mt-4 leading-relaxed">{product.description}</p>

          <p className={`mt-4 text-sm ${!outOfStock ? 'text-green-600' : 'text-red-500'}`}>
            {!outOfStock ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {!outOfStock && (
            <div className="flex items-center gap-4 mt-6">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border border-cardBorder rounded-md px-3 py-2 text-sm"
              />
              <button
                onClick={handleAddToCart}
                className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-700 flex items-center gap-1.5"
              >
                {added ? 'Added ✓' : (
                  <>
                    Add to Cart <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
