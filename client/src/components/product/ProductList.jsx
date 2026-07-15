import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="text-center text-body py-16">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
