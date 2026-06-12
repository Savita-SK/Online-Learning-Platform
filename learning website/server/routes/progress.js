const express = require('express');
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, progressController.getUserProgress);
router.post('/update', authMiddleware, progressController.updateProgress);

module.exports = router;
