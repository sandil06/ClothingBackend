// ==== controllers/styleComboController.js ====
const OutfitCombination = require('../models/OutfitCombination');
const ClothingItem = require('../models/ClothingItem');

// @desc    Get all outfit combos
// @route   GET /api/style-combos
// @access  Private
const getStyleCombos = async (req, res) => {
  try {
    const { q } = req.query;
    let filter = {};
    if (req.user && req.user._id) {
      filter.user = req.user._id;
    }
    if (q) {
      const searchRx = new RegExp(q, 'i');
      filter.$or = [
        { name: searchRx },
        { notes: searchRx }
      ];
    }
    const combos = await OutfitCombination.find(filter)
      .populate('items')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: combos.length,
      data: combos
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single style combo
// @route   GET /api/style-combos/:id
// @access  Private
const getStyleCombo = async (req, res) => {
  try {
    const combo = await OutfitCombination.findById(req.params.id)
      .populate('items');

    if (!combo) {
      return res.status(404).json({ message: 'Style combo not found' });
    }

    if (combo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(combo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create outfit combo
// @route   POST /api/style-combos
// @access  Private
const createStyleCombo = async (req, res) => {
  try {
    const { name, items, occasion, season, notes } = req.body;

    // Verify all items exist and belong to user
    for (const itemId of items) {
      const item = await ClothingItem.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: `Item ${itemId} not found` });
      }
      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to use this item' });
      }
    }

    const images = req.files ? req.files.map(file => file.path) : [];

    const combo = await OutfitCombination.create({
      outfitId: `OC${Date.now()}`,
      user: req.user._id,
      name,
      items,
      occasion,
      season,
      notes,
      images
    });

    await combo.populate('items');

    res.status(201).json(combo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update outfit combo
// @route   PUT /api/style-combos/:id
// @access  Private
const updateStyleCombo = async (req, res) => {
  try {
    let combo = await OutfitCombination.findById(req.params.id);

    if (!combo) {
      return res.status(404).json({ message: 'Combo not found' });
    }

    if (combo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // If updating items, verify ownership
    if (req.body.items) {
      for (const itemId of req.body.items) {
        const item = await ClothingItem.findById(itemId);
        if (!item || item.owner.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'Not authorized to use this item' });
        }
      }
    }

    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map(file => file.path);
    }

    combo = await OutfitCombination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('items');

    res.json(combo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete outfit combo
// @route   DELETE /api/style-combos/:id
// @access  Private
const deleteStyleCombo = async (req, res) => {
  try {
    const combo = await OutfitCombination.findById(req.params.id);

    if (!combo) {
      return res.status(404).json({ message: 'Combo not found' });
    }

    if (combo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await combo.deleteOne();

    res.json({ message: 'Combo removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Track outfit usage
// @route   PUT /api/style-combos/:id/track-usage
// @access  Private
const trackUsage = async (req, res) => {
  try {
    const combo = await OutfitCombination.findById(req.params.id);

    if (!combo) {
      return res.status(404).json({ message: 'Combo not found' });
    }

    if (combo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    combo.usageCount += 1;
    combo.lastWorn = new Date();
    await combo.save();

    res.json(combo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get style combos by occasion
// @route   GET /api/style-combos/occasion/:occasion
// @access  Private
const getCombosByOccasion = async (req, res) => {
  try {
    const combos = await OutfitCombination.find({ 
      user: req.user._id,
      occasion: req.params.occasion
    }).populate('items');

    res.json({
      success: true,
      count: combos.length,
      data: combos
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStyleCombos,
  getStyleCombo,
  createStyleCombo,
  updateStyleCombo,
  deleteStyleCombo,
  trackUsage,
  getCombosByOccasion
};