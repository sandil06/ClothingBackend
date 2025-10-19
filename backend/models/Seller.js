const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  sellerId: {
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
  businessName: String,
  businessAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  role: {
    type: String,
    default: 'seller'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Seller', sellerSchema);