// Fixed categories always shown, regardless of what's in the database
const FIXED_CATEGORIES = ['Kids', 'Men', 'Women'];

export default function ProductFilter({ keyword, setKeyword, category, setCategory, categories, onSearch }) {
  // Merge fixed categories with dynamic ones from the DB, removing duplicates
  const allCategories = [...new Set([...FIXED_CATEGORIES, ...categories])];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="flex flex-col sm:flex-row gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 border border-cardBorder rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-cardBorder rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="all">All Categories</option>
        {allCategories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary-700"
      >
        Search
      </button>
    </form>
  );
}
