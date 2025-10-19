const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add item name']
  },
  category: {
    type: String,
    required: [true, 'Please add category'],
    enum: ['menswear', 'womenswear', 'kidswear']
  },
  type: {
    type: String,
    required: [true, 'Please add type']
  },
  brand: {
    type: String
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'all-season']
  },
  color: {
    type: String
  },
  size: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please add price']
  },
  discount: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  images: [{
    type: String
  }],
  occasion: {
    type: String,
    enum: ['casual', 'formal', 'party', 'office', 'sports', 'wedding']
  },
  usageCount: {
    type: Number,
    default: 0
  },
  lastWorn: {
    type: Date
  },
  purchaseDate: {
    type: Date
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  // For kids wear
  ageGroup: {
    type: String,
    enum: ['baby', 'kids', 'teens']
  },
  growthStageNotes: {
    type: String
  },
  durability: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  // Smart filters
  itemSubcategory: {
    type: String,
    enum: ['dress', 'accessories', 'footwear', 'eyewear', 'tops', 'bottoms']
  }
}, {
  timestamps: true
});

// Calculate discounted price
clothingItemSchema.virtual('discountedPrice').get(function() {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount / 100);
  }
  return this.price;
});

// Calculate cost per wear
clothingItemSchema.virtual('costPerWear').get(function() {
  if (this.usageCount > 0) {
    return (this.price / this.usageCount).toFixed(2);
  }
  return this.price;
});

clothingItemSchema.set('toJSON', { virtuals: true });
clothingItemSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('ClothingItem', clothingItemSchema);