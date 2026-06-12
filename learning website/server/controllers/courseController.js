const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course' });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user.enrolledCourses.includes(course._id)) {
      user.enrolledCourses.push(course._id);
      await user.save();
    }

    res.json({ message: 'Enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Course enrollment failed' });
  }
};
