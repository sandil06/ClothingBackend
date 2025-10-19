const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Import controller functions (to be created)
const {
  getMenswearItems,
  getMenswearItem,
  createMenswearItem,
  updateMenswearItem,
  deleteMenswearItem
} = require('../controllers/menswearController');

router.route('/')
  .get(getMenswearItems)
  .post(protect, upload.array('images', 5), createMenswearItem);

router.route('/:id')
  .get(protect, getMenswearItem)
  .put(protect, upload.array('images', 5), updateMenswearItem)
  .delete(protect, deleteMenswearItem);

module.exports = router;