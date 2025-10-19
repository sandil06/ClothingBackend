const Feedback = require('../models/Feedback');

// @desc    Create feedback
// @route   POST /api/feedback
// @access  Private
const createFeedback = async (req, res) => {
  try {
    const { rating, comment, category } = req.body;

    const feedback = await Feedback.create({
      feedbackId: `FB${Date.now()}`,
      user: req.user._id,
      rating,
      comment,
      category
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await feedback.deleteOne();

    res.json({ message: 'Feedback removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  deleteFeedback
};
