const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  generateReport,
  getReports
} = require('../controllers/reportController');

router.route('/')
  .post(protect, generateReport)
  .get(protect, getReports);

module.exports = router;