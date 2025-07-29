const Booking = require('../models/Booking');
const Showtime = require('../models/Showtime');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createBooking = catchAsync(async (req, res, next) => {
  const { showtimeId, seats, paymentMethod } = req.body;
  
  // Get showtime and check availability
  const showtime = await Showtime.findById(showtimeId);
  if (!showtime) {
    return next(new AppError('No showtime found with that ID', 404));
  }
  
  if (seats.length > showtime.availableSeats) {
    return next(new AppError('Not enough seats available', 400));
  }
  
  // Calculate total amount
  const totalAmount = seats.length * showtime.price;
  
  // Create booking
  const booking = await Booking.create({
    user: req.user.id,
    showtime: showtimeId,
    seats,
    totalAmount,
    paymentMethod,
    paymentId: `PAY${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
  });
  
  // Update available seats
  showtime.availableSeats -= seats.length;
  if (showtime.availableSeats === 0) {
    showtime.status = 'sold_out';
  } else if (showtime.availableSeats < 10) {
    showtime.status = 'almost_full';
  }
  await showtime.save();
  
  res.status(201).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.getUserBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });
  
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();
  
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  
  // Check if user owns the booking or is admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to view this booking', 403));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  
  // Check if user owns the booking or is admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to cancel this booking', 403));
  }
  
  booking.status = 'cancelled';
  await booking.save();
  
  // Add seats back to showtime
  const showtime = await Showtime.findById(booking.showtime._id);
  if (showtime) {
    showtime.availableSeats += booking.seats.length;
    if (showtime.availableSeats > 0 && showtime.status === 'sold_out') {
      showtime.status = 'available';
    }
    await showtime.save();
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});