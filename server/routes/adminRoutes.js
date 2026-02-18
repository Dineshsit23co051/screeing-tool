// Admin analytics route with user, feedback, and condition metrics.
const express = require('express');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/analytics', protect, adminOnly, async (_req, res) => {
  const [totalUsers, feedbackStats, commonConditions] = await Promise.all([
    User.countDocuments(),
    Feedback.aggregate([
      {
        $group: {
          _id: null,
          averageFeedback: { $avg: '$rating' },
          totalFeedback: { $sum: 1 }
        }
      }
    ]),
    Feedback.aggregate([
      { $match: { condition: { $ne: null } } },
      { $group: { _id: '$condition', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])
  ]);

  return res.json({
    totalUsers,
    averageFeedback: feedbackStats[0]?.averageFeedback || 0,
    totalFeedback: feedbackStats[0]?.totalFeedback || 0,
    mostCommonConditions: commonConditions
  });
});

module.exports = router;
