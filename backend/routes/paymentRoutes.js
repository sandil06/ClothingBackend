const express = require('express');
const router = express.Router();
const {
  createPaymentIntent,
  confirmPayment,
  getPaymentHistory,
  refundPayment,
  getAllPayments,
  deletePayment
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/create-intent', protect, createPaymentIntent);
router.post('/confirm', protect, confirmPayment);
router.get('/history', protect, getPaymentHistory);
router.post('/refund/:id', protect, refundPayment);
router.get('/all', protect, authorize('admin'), getAllPayments);
router.delete('/:id', protect, authorize('admin'), deletePayment);

module.exports = router;