import Product from '../models/Product.js';

// @desc    Get all products (with optional search/category filter)
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const { keyword, category } = req.query;

    const query = {};

    if (keyword) {
      query.$text = { $search: keyword };
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product (admin only)
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image, stock, outOfStock } = req.body;

    const product = await Product.create({
      name: name?.trim(),
      description,
      price,
      category: category?.trim(),
      image,
      stock,
      outOfStock: outOfStock ?? false,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (admin only)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, description, price, category, image, stock, outOfStock } = req.body;

    if (name !== undefined) product.name = name.trim();
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category.trim();
    if (image !== undefined) product.image = image;
    if (stock !== undefined) product.stock = stock;
    if (outOfStock !== undefined) product.outOfStock = outOfStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (admin only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Quickly toggle a product's out-of-stock flag (admin only)
// @route   PATCH /api/products/:id/toggle-stock
export const toggleOutOfStock = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.outOfStock = !product.outOfStock;
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Get distinct product categories
// @route   GET /api/products/categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
