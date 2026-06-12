const express = require('express');
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:courseId', quizController.getQuizForCourse);
router.post('/:courseId/submit', authMiddleware, quizController.submitQuiz);

module.exports = router;
