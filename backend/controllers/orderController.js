const Order = require('../models/Order');
const Cart = require('../models/Cart');
const ClothingItem = require('../models/ClothingItem');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, discount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Calculate total price
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const clothingItem = await ClothingItem.findById(item.item);
      if (!clothingItem) {
        return res.status(404).json({ message: `Item ${item.item} not found` });
      }

      orderItems.push({
        item: item.item,
        quantity: item.quantity,
        price: clothingItem.price
      });

      totalPrice += clothingItem.price * item.quantity;
    }

    // Apply discount
    if (discount) {
      totalPrice -= (totalPrice * discount / 100);
    }

    const order = await Order.create({
      orderId: `ORD${Date.now()}`,
      buyer: req.user._id,
      items: orderItems,
      totalPrice,
      discount: discount || 0,
      shippingAddress
    });

    // Clear cart after order
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete order (admin)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.deleteOne();
    res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders (buyer: own, admin: all)
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { buyer: req.user._id };
    const orders = await Order.find(query)
      .populate('items.item')
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.item')
      .populate('buyer', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.buyer._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private (Admin/Seller)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
