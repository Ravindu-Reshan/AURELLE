import { useState, useEffect, useRef } from 'react';
import api, { SERVER_URL } from '../../api/axios';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  category: '',
  image: '',
  stock: '',
  outOfStock: false,
};

export default function ProductForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyProduct);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyProduct);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // Upload a file picked from the admin's device, then use the returned URL
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Store the full URL so it displays correctly everywhere in the app
      setForm((prev) => ({ ...prev, image: `${SERVER_URL}${data.image}` }));
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Upload failed. Try a smaller image (max 5MB).');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-lg shadow-sm p-6 space-y-4 mb-6">
      <h3 className="font-semibold text-lg">{initialData ? 'Edit Product' : 'Add New Product'}</h3>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
          className="border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock quantity"
          value={form.stock}
          onChange={handleChange}
          required
          className="border border-cardBorder rounded-md px-3 py-2 text-sm"
        />

        <label className="col-span-2 flex items-center gap-2 text-sm text-heading cursor-pointer">
          <input
            name="outOfStock"
            type="checkbox"
            checked={form.outOfStock}
            onChange={handleChange}
            className="w-4 h-4 accent-primary-600"
          />
          Mark as Out of Stock
          <span className="text-xs text-body">
            (overrides stock count — product will show "Out of Stock" and can't be purchased)
          </span>
        </label>

        {/* Image: URL input OR device upload, both write to the same form.image field */}
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium text-heading">Product Image</label>

          <input
            name="image"
            placeholder="Paste an image URL..."
            value={form.image}
            onChange={handleChange}
            className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
          />

          <div className="flex items-center gap-3">
            <span className="text-xs text-body">— or —</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="border border-cardBorder px-4 py-2 rounded-full text-sm font-medium hover:bg-background disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload from device'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleFileUpload}
              className="hidden"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-12 h-12 object-cover rounded-md border border-cardBorder"
              />
            )}
          </div>

          {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="border border-cardBorder rounded-md px-3 py-2 text-sm col-span-2"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={uploading}
          className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 disabled:opacity-50"
        >
          {initialData ? 'Update Product' : 'Add Product'}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-cardBorder px-5 py-2 rounded-full text-sm font-medium hover:bg-background"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
