const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protected routes - all booking routes require authentication
router.use(authController.protect);

// User routes
router.post('/', bookingController.createBooking);
router.get('/my-bookings', bookingController.getUserBookings);
router.get('/:id', bookingController.getBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);

// Admin routes
router.use(authController.restrictTo('admin'));
router.get('/', bookingController.getAllBookings);
router.patch('/:id', bookingController.updateBooking);

module.exports = router;