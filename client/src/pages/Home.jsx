import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../redux/slices/productSlice';
import ProductFilter from '../components/product/ProductFilter';
import CategorySection from '../components/product/CategorySection';
import Loader from '../components/common/Loader';
import HeroSlideshow from '../components/common/HeroSlideshow';

export default function Home() {
  const dispatch = useDispatch();
  const { items, categories, loading, error } = useSelector((state) => state.products);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchProducts({ keyword, category }));
  };

  // Group products by their category so each category gets its own row
  const groupedByCategory = items.reduce((groups, product) => {
    const key = product.category || 'Other';
    if (!groups[key]) groups[key] = [];
    groups[key].push(product);
    return groups;
  }, {});

  return (
    <div>
      <HeroSlideshow />

      <div id="products-section" className="max-w-[1600px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-heading mb-6">Browse Products</h1>

        <ProductFilter
          keyword={keyword}
          setKeyword={setKeyword}
          category={category}
          setCategory={setCategory}
          categories={categories}
          onSearch={handleSearch}
        />

        {error && (
          <p className="text-center text-red-500 py-4">Error loading products: {error}</p>
        )}

        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <p className="text-center text-body py-16">No products found.</p>
        ) : (
          Object.entries(groupedByCategory).map(([categoryName, products]) => (
            <CategorySection key={categoryName} category={categoryName} products={products} />
          ))
        )}
      </div>
    </div>
  );
}
