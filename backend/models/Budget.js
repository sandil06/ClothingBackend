const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  budgetId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  annualBudget: {
    type: Number,
    required: true
  },
  currentSpending: {
    type: Number,
    default: 0
  },
  category: {
    menswear: { type: Number, default: 0 },
    womenswear: { type: Number, default: 0 },
    kidswear: { type: Number, default: 0 }
  },
  alerts: {
    enabled: { type: Boolean, default: true },
    threshold: { type: Number, default: 80 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);