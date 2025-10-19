const clothingItem = require('../models/ClothingItem');

  const getWomenswearItems = async (req, res) => {
  try {
    const { brand, season, color, occasion, type, q } = req.query;
    
    let filter = { category: 'womenswear' };
    if (req.user && req.user._id) {
      filter.owner = req.user._id;
    }

    if (brand) filter.brand = brand;
    if (season) filter.season = season;
    if (color) filter.color = color;
    if (occasion) filter.occasion = occasion;
    if (type) {
      const rx = new RegExp(type, 'i');
      filter.$or = [
        { itemSubcategory: rx },
        { type: rx }
      ];
    }
    if (q) {
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

const getWomenswearItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);

    if (!item || item.category !== 'womenswear') {
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

const createWomenswearItem = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.path) : [];

    const item = await ClothingItem.create({
      ...req.body,
      itemId: `WW${Date.now()}`,
      category: 'womenswear',
      owner: req.user._id,
      images
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateWomenswearItem = async (req, res) => {
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

const deleteWomenswearItem = async (req, res) => {
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
  getWomenswearItems,
  getWomenswearItem,
  createWomenswearItem,
  updateWomenswearItem,
  deleteWomenswearItem
};

