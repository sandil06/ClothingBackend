// ==== controllers/paymentController.js ====
const stripe = require('../config/stripe');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const Budget = require('../models/Budget');

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { orderId, userId: req.user._id.toString() },
    });

    res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete payment (admin)
// @route   DELETE /api/payments/:id
// @access  Private/Admin
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    await payment.deleteOne();
    res.json({ success: true, message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId, paymentMethod } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const payment = await Payment.create({
      paymentId: `PAY${Date.now()}`,
      user: req.user._id,
      order: orderId,
      amount: paymentIntent.amount / 100,
      paymentMethod,
      stripePaymentId: paymentIntentId,
      status: paymentIntent.status === 'succeeded' ? 'completed' : 'pending',
      cardDetails: {
        last4: paymentIntent.charges.data[0]?.payment_method_details?.card?.last4,
        brand: paymentIntent.charges.data[0]?.payment_method_details?.card?.brand,
      },
    });

    if (payment.status === 'completed') {
      await Order.findByIdAndUpdate(orderId, { status: 'processing' });
      const budget = await Budget.findOne({ user: req.user._id });
      if (budget) {
        budget.currentSpending += payment.amount;
        await budget.save();
      }
    }

    res.json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment history (current user)
// @route   GET /api/payments/history
// @access  Private
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('order')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('order')
      .populate('user', 'name email');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    if (payment.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Refund payment
// @route   POST /api/payments/refund/:id
// @access  Private
const refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    if (payment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const refund = await stripe.refunds.create({ payment_intent: payment.stripePaymentId });
    payment.status = 'refunded';
    await payment.save();
    const budget = await Budget.findOne({ user: payment.user });
    if (budget) {
      budget.currentSpending -= payment.amount;
      await budget.save();
    }
    res.json({ message: 'Payment refunded successfully', refund, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ALL payments (admin)
// @route   GET /api/payments/all
// @access  Private/Admin
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate('order')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
  getPaymentHistory,
  getPaymentById,
  refundPayment,
  getAllPayments,
  deletePayment,
};