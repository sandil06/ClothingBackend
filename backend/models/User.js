const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin', 'store_manager'],
    default: 'buyer'
  },
  phone: {
    type: String
  },
  // Profile fields
  dob: {
    type: Date
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  discriminatorKey: 'role'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Buyer Discriminator
const buyerSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    unique: true
  },
  shippingAddresses: [{
    address: String,
    city: String,
    postalCode: String,
    country: String,
    isDefault: Boolean
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Buyer = User.discriminator('buyer', buyerSchema);

// Seller Discriminator
const sellerSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    unique: true
  },
  storeName: {
    type: String
  },
  storeDescription: {
    type: String
  },
  businessLicense: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  }
});

const Seller = User.discriminator('seller', sellerSchema);

module.exports = { User, Buyer, Seller };