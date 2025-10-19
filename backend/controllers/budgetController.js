const Budget = require('../models/Budget');
const ClothingItem = require('../models/ClothingItem');

// @desc    Create or update budget
// @route   POST /api/budget
// @access  Private
const setBudget = async (req, res) => {
  try {
    const { annualBudget } = req.body;

    let budget = await Budget.findOne({ user: req.user._id });

    if (budget) {
      budget.annualBudget = annualBudget;
      await budget.save();
    } else {
      budget = await Budget.create({
        budgetId: `BDG${Date.now()}`,
        user: req.user._id,
        annualBudget
      });
    }

    res.json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get budget
// @route   GET /api/budget
// @access  Private
const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user._id });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const remaining = budget.annualBudget - budget.currentSpending;
    const percentageUsed = (budget.currentSpending / budget.annualBudget) * 100;

    res.json({
      ...budget.toObject(),
      remaining,
      percentageUsed: percentageUsed.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate spending report
// @route   GET /api/budget/report
// @access  Private
const getSpendingReport = async (req, res) => {
  try {
    const { category, brand, startDate, endDate } = req.query;

    let filter = { owner: req.user._id };

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (startDate && endDate) {
      filter.purchaseDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const items = await ClothingItem.find(filter);

    const totalSpent = items.reduce((sum, item) => sum + item.price, 0);
    const categoryBreakdown = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.price;
      return acc;
    }, {});

    const brandBreakdown = items.reduce((acc, item) => {
      if (item.brand) {
        acc[item.brand] = (acc[item.brand] || 0) + item.price;
      }
      return acc;
    }, {});

    res.json({
      totalSpent,
      itemCount: items.length,
      categoryBreakdown,
      brandBreakdown,
      items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  setBudget,
  getBudget,
  getSpendingReport
};