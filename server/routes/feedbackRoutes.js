// Feedback route stores user quality ratings.
const express = require('express');
const Feedback = require('../models/Feedback');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { rating, comment, condition } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  const feedback = await Feedback.create({
    user: req.user._id,
    rating,
    comment,
    condition
  });

  return res.status(201).json(feedback);
});

module.exports = router;
