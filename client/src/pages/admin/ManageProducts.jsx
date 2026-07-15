import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import Sidebar from '../../components/admin/Sidebar';
import ProductForm from '../../components/admin/ProductForm';
import api from '../../api/axios';
import { formatPrice } from '../../utils/formatPrice';

export default function ManageProducts() {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleSubmit = async (data) => {
    if (editingProduct) {
      await api.put(`/products/${editingProduct._id}`, data);
    } else {
      await api.post('/products', data);
    }
    setEditingProduct(null);
    setShowForm(false);
    dispatch(fetchProducts({}));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    dispatch(fetchProducts({}));
  };

  const handleToggleStock = async (id) => {
    await api.patch(`/products/${id}/toggle-stock`);
    dispatch(fetchProducts({}));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 flex gap-8">
      <Sidebar />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-heading">Manage Products</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(!showForm);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-700"
          >
            {showForm ? 'Close' : '+ Add Product'}
          </button>
        </div>

        {showForm && (
          <ProductForm
            initialData={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingProduct(null);
              setShowForm(false);
            }}
          />
        )}

        <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-background text-left text-body uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStock(product._id)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                        product.outOfStock || product.stock === 0
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {product.outOfStock || product.stock === 0 ? 'Out of Stock' : 'In Stock'}
                    </button>
                  </td>
                  <td className="px-4 py-3 space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-primary-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
