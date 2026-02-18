// AI analysis route including crisis detection safety guard.
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { hasCrisisSignal, crisisMessage } = require('../utils/crisisDetection');
const { analyzeMentalState } = require('../utils/aiService');

const router = express.Router();

router.post('/analyze', protect, async (req, res) => {
  const { assessment, message, language } = req.body;

  if (!message || !language) {
    return res.status(400).json({ message: 'message and language are required' });
  }

  if (hasCrisisSignal(message)) {
    return res.json({
      emergency: true,
      alert: crisisMessage(language)
    });
  }

  const result = await analyzeMentalState({ assessment, message, language });
  return res.json({ emergency: false, ...result });
});

module.exports = router;
