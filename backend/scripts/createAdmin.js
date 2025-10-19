const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const { User } = require('../models/User');

(async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      console.error('Missing MONGO_URI in environment');
      process.exit(1);
    }
    await connectDB();

    const name = process.env.ADMIN_NAME || 'Admin User';
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in environment');
      process.exit(1);
    }

    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      user = new User({ name, email, password, role: 'admin' });
      await user.save();
      console.log(`Created admin: ${email}`);
    } else {
      // promote to admin and optionally reset password
      user.role = 'admin';
      if (password) user.password = password; // will be re-hashed by pre-save
      await user.save();
      console.log(`Updated existing user to admin: ${email}`);
    }

    const safe = await User.findOne({ email });
    console.log({ _id: safe._id.toString(), email: safe.email, role: safe.role, name: safe.name });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
