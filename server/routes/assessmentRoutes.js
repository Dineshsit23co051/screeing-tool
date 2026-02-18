// Assessment routes to save and fetch user answers.
const express = require('express');
const Assessment = require('../models/Assessment');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { language, responses } = req.body;

  if (!language || !Array.isArray(responses) || responses.length !== 5) {
    return res.status(400).json({ message: 'Provide language and 5 responses' });
  }

  const assessment = await Assessment.create({
    user: req.user._id,
    language,
    responses
  });

  return res.status(201).json(assessment);
});

router.get('/latest', protect, async (req, res) => {
  const assessment = await Assessment.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  return res.json(assessment || null);
});

module.exports = router;
