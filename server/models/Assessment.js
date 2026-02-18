// Assessment model stores language-specific answers and links to user.
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    language: { type: String, enum: ['en', 'ta'], required: true },
    responses: [
      {
        questionId: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assessmentSchema);
