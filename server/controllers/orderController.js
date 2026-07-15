import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create a new order (mock checkout)
// @route   POST /api/orders
export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    if (paymentMethod && !['COD', 'Online'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Recalculate total on the server for integrity
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });

      // Decrement stock
      product.stock -= item.quantity;
      await product.save();
    }

    const method = paymentMethod || 'COD';

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod: method,
      // Online payment is treated as paid immediately (mock gateway).
      // Cash on Delivery is only marked paid once the order is delivered.
      isPaid: method === 'Online',
      paidAt: method === 'Online' ? Date.now() : undefined,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by ID (owner or admin)
// @route   GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    // Re-fetch with the customer's name/email populated, so the admin
    // table doesn't lose the customer name after a status update.
    const updatedOrder = await Order.findById(order._id).populate('user', 'name email');

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
