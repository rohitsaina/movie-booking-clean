const express = require('express');
const cinemaController = require('../controllers/cinemaController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', cinemaController.getAllCinemas);
router.get('/location', cinemaController.getCinemasByLocation);
router.get('/:id', cinemaController.getCinema);

// Protected routes (admin only)
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.post('/', cinemaController.createCinema);
router.patch('/:id', cinemaController.updateCinema);
router.delete('/:id', cinemaController.deleteCinema);

module.exports = router;