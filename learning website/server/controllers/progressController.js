const Progress = require('../models/Progress');

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id }).populate('course', 'title description');
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress' });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { courseId, completedLessons } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id, course: courseId },
      { completedLessons, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ message: 'Progress updated', progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update progress' });
  }
};
