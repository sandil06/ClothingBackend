const clothingItem = require('../models/ClothingItem');

// @desc    Get all menswear items
// @route   GET /api/menswear
// @access  Public (owner filter applied when authenticated)
  const getMenswearItems = async (req, res) => {
  try {
    const { brand, season, color, occasion, type, q } = req.query;
    
    let filter = { 
      category: 'menswear'
    };
    // Apply owner scoping only when authenticated requests
    if (req.user && req.user._id) {
      filter.owner = req.user._id;
    }

    if (brand) filter.brand = brand;
    if (season) filter.season = season;
    if (color) filter.color = color;
    if (occasion) filter.occasion = occasion;
    if (type) {
      // Support both legacy 'itemSubcategory' and potential 'type' field with case-insensitive match
      const rx = new RegExp(type, 'i');
      filter.$or = [
        { itemSubcategory: rx },
        { type: rx }
      ];
    }
    if (q) {
      // Search across name and description
      const searchRx = new RegExp(q, 'i');
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { name: searchRx },
          { description: searchRx }
        ]
      });
    }

    const items = await ClothingItem.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single menswear item
// @route   GET /api/menswear/:id
// @access  Private
const getMenswearItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);

    if (!item || item.category !== 'menswear') {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create menswear item
// @route   POST /api/menswear
// @access  Private
const createMenswearItem = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.path) : [];

    const item = await ClothingItem.create({
      ...req.body,
      itemId: `MW${Date.now()}`,
      category: 'menswear',
      owner: req.user._id,
      images
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update menswear item
// @route   PUT /api/menswear/:id
// @access  Private
const updateMenswearItem = async (req, res) => {
  try {
    let item = await ClothingItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map(file => file.path);
    }

    item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete menswear item
// @route   DELETE /api/menswear/:id
// @access  Private
const deleteMenswearItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await item.deleteOne();

    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMenswearItems,
  getMenswearItem,
  createMenswearItem,
  updateMenswearItem,
  deleteMenswearItem
};
