const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Calculate percentage
const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

// Generate unique ID
const generateUniqueId = (prefix) => {
  return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

// Validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Calculate discount price
const calculateDiscountPrice = (price, discount) => {
  if (discount <= 0) return price;
  return price - (price * discount / 100);
};

// Parse date range
const parseDateRange = (startDate, endDate) => {
  return {
    $gte: new Date(startDate),
    $lte: new Date(endDate)
  };
};

module.exports = {
  formatCurrency,
  calculatePercentage,
  generateUniqueId,
  isValidEmail,
  calculateDiscountPrice,
  parseDateRange
};