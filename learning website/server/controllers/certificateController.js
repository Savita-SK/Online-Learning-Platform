const Certificate = require('../models/Certificate');
const Progress = require('../models/Progress');

exports.generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const progress = await Progress.findOne({ user: req.user._id, course: courseId });
    if (!progress || progress.quizScore === 0) {
      return res.status(400).json({ message: 'Complete the quiz to generate a certificate' });
    }

    const certificateUrl = `${req.protocol}://${req.get('host')}/server/uploads/certificates/${req.user._id}-${courseId}.pdf`;

    const certificate = new Certificate({
      user: req.user._id,
      course: courseId,
      certificateUrl,
    });
    await certificate.save();

    progress.certificateIssued = true;
    await progress.save();

    res.json({ message: 'Certificate generated', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate certificate' });
  }
};

exports.getUserCertificates = async (req, res) => {
  try {
    if (req.params.userId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden access' });
    }

    const certificates = await Certificate.find({ user: req.user._id }).populate('course', 'title description');
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch certificates' });
  }
};
