const { body, validationResult } = require('express-validator');

// Validate registration
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .isIn(['buyer', 'seller', 'admin', 'store_manager'])
    .withMessage('Invalid role'),
];

// Validate login
const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Validate clothing item
const validateClothingItem = [
  body('name').trim().notEmpty().withMessage('Item name is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['menswear', 'womenswear', 'kidswear'])
    .withMessage('Invalid category'),
];

// Check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateClothingItem,
  checkValidation
};
