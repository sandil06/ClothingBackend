const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'wallet', 'bank_transfer']
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  role: {
    type: String,
    default: 'buyer'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Buyer', buyerSchema);

