const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClothingItem'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);