const mongoose = require('mongoose');

const stylistAssistantSchema = new mongoose.Schema({
  assistantId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  skills: [{
    type: String
  }],
  availability: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StylistAssistant', stylistAssistantSchema);