import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x400?text=Product+Image',
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // Lets admin manually mark a product as out of stock (e.g. temporarily
    // unavailable) regardless of the stock count. A product is considered
    // out of stock if EITHER stock is 0 OR this flag is set.
    outOfStock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Text index to support search
productSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
