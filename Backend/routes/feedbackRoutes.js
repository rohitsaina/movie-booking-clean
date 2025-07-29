const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route for creating feedback
router.post('/', feedbackController.createFeedback);

// Protected routes (admin only)
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;