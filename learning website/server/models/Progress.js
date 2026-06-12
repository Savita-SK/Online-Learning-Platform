const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: String }],
  quizScore: { type: Number, default: 0 },
  certificateIssued: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progress', progressSchema);
