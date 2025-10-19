const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createFeedback,
  getAllFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

router.route('/')
  .post(protect, createFeedback)
  .get(protect, getAllFeedback);

router.delete('/:id', protect, deleteFeedback);

module.exports = router;