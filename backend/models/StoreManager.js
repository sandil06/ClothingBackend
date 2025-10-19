// ==== models/StoreManager.js ====
const mongoose = require('mongoose');

const storeManagerSchema = new mongoose.Schema({
  managerId: {
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
  storeName: {
    type: String
  },
  storeLocation: {
    type: String
  },
  role: {
    type: String,
    default: 'store_manager'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StoreManager', storeManagerSchema);