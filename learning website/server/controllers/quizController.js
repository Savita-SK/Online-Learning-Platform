const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');

exports.getQuizForCourse = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const answers = req.body.answers || [];
    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] && answers[index] === question.answer) {
        score += 1;
      }
    });

    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id, course: req.params.courseId },
      { quizScore: score, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ message: 'Quiz submitted', score, progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit quiz' });
  }
};
