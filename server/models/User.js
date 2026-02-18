// User model with role for admin access control.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    preferredLanguage: { type: String, enum: ['en', 'ta'], default: 'en' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
