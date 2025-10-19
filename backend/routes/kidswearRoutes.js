const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  getKidswearItems,
  getKidswearItem,
  createKidswearItem,
  updateKidswearItem,
  deleteKidswearItem
} = require('../controllers/kidswearController');

router.route('/')
  .get(getKidswearItems)
  .post(protect, upload.array('images', 5), createKidswearItem);

router.route('/:id')
  .get(protect, getKidswearItem)
  .put(protect, upload.array('images', 5), updateKidswearItem)
  .delete(protect, deleteKidswearItem);

module.exports = router;