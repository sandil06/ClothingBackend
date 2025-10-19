const express = require('express');
const router = express.Router();
const {
  getStyleCombos,
  createStyleCombo,
  updateStyleCombo,
  deleteStyleCombo
} = require('../controllers/styleComboController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getStyleCombos)
  .post(protect, upload.array('images', 3), createStyleCombo);

router.route('/:id')
  .put(protect, upload.array('images', 3), updateStyleCombo)
  .delete(protect, deleteStyleCombo);

module.exports = router;