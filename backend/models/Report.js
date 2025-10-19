const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportType: {
    type: String,
    enum: ['spending', 'usage', 'budget', 'comprehensive'],
    required: true
  },
  generationDate: {
    type: Date,
    default: Date.now
  },
  dateRange: {
    startDate: Date,
    endDate: Date
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  },
  summary: {
    totalSpent: Number,
    totalItems: Number,
    totalOrders: Number,
    averageOrderValue: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);