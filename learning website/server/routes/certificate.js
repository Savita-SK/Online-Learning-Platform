const express = require('express');
const certificateController = require('../controllers/certificateController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate', authMiddleware, certificateController.generateCertificate);
router.get('/:userId', authMiddleware, certificateController.getUserCertificates);

module.exports = router;
