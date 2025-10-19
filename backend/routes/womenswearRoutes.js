const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  getWomenswearItems,
  getWomenswearItem,
  createWomenswearItem,
  updateWomenswearItem,
  deleteWomenswearItem
} = require('../controllers/womenswearController');

router.route('/')
  .get(getWomenswearItems)
  .post(protect, upload.array('images', 5), createWomenswearItem);

router.route('/:id')
  .get(protect, getWomenswearItem)
  .put(protect, upload.array('images', 5), updateWomenswearItem)
  .delete(protect, deleteWomenswearItem);

module.exports = router;
