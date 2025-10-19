const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables from backend/.env explicitly (works from monorepo root)
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
connectDB();

const app = express();

// Middleware
if (process.env.NODE_ENV !== 'production') {
  // Development CORS: allow any localhost port (Vite may choose another port)
  const localhostRegex = /http:\/\/localhost:\d+$/;
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || localhostRegex.test(origin)) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/menswear', require('./routes/menswearRoutes'));
app.use('/api/womenswear', require('./routes/womenswearRoutes'));
app.use('/api/kidswear', require('./routes/kidswearRoutes'));
app.use('/api/style-combos', require('./routes/styleComboRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/budget', require('./routes/budgetRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Fashion Wardrobe API is running',
    version: '1.0.0',
    status: 'active',
  });
});

// API documentation route
app.get('/api', (req, res) => {
  res.json({
    message: 'Fashion Wardrobe API',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      menswear: '/api/menswear',
      womenswear: '/api/womenswear',
      kidswear: '/api/kidswear',
      styleCombos: '/api/style-combos',
      cart: '/api/cart',
      orders: '/api/orders',
      payments: '/api/payments',
      budget: '/api/budget',
      feedback: '/api/feedback',
      reports: '/api/reports'
    }
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(distPath));

  // Catch-all: return index.html for React Router routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║   Fashion Wardrobe API Server                          ║
║   Running on port ${PORT}                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}║
╚════════════════════════════════════════════════════════╝
`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;