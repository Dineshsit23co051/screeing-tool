// Feedback model for post-session rating and comment.
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true, default: '' },
    condition: { type: String, default: 'Unknown' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
