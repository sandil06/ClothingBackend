const mongoose = require('mongoose');

const outfitCombinationSchema = new mongoose.Schema({
  outfitId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add combo name']
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothingItem'
  }],
  occasion: {
    type: String,
    enum: ['casual', 'formal', 'party', 'office', 'sports', 'wedding']
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'all-season']
  },
  usageCount: {
    type: Number,
    default: 0
  },
  lastWorn: {
    type: Date
  },
  images: [{
    type: String
  }],
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Calculate total cost of outfit
outfitCombinationSchema.virtual('totalCost').get(function() {
  if (this.items && this.items.length > 0) {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }
  return 0;
});

outfitCombinationSchema.set('toJSON', { virtuals: true });
outfitCombinationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('OutfitCombination', outfitCombinationSchema);