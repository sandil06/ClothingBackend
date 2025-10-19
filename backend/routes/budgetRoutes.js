const express = require('express');
const router = express.Router();
const {
  setBudget,
  getBudget,
  getSpendingReport
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getBudget)
  .post(protect, setBudget);

router.get('/report', protect, getSpendingReport);

module.exports = router;
