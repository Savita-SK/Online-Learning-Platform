const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.post('/:id/enroll', authMiddleware, courseController.enrollCourse);

module.exports = router;
