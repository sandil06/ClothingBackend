const ClothingItem = require('../models/ClothingItem');
const Order = require('../models/Order');

// @desc    Generate comprehensive report
// @route   POST /api/reports
// @access  Private
const generateReport = async (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.body;

    let filter = { owner: req.user._id };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const items = await ClothingItem.find(filter);
    const orders = await Order.find({ 
      buyer: req.user._id,
      ...(startDate && endDate && {
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      })
    });

    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalItems = items.length;

    const categoryStats = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const report = {
      reportType,
      generatedAt: new Date(),
      period: { startDate, endDate },
      summary: {
        totalSpent,
        totalItems,
        totalOrders: orders.length,
        averageOrderValue: orders.length > 0 ? totalSpent / orders.length : 0
      },
      categoryStats,
      items,
      orders
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
  try {
    // This is a simplified version - you might want to store reports in DB
    res.json({ message: 'Reports feature - implement based on requirements' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateReport,
  getReports
};