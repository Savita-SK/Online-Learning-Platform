const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  lessons: [{ title: String, content: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
