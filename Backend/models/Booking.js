const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user'],
  },
  showtime: {
    type: mongoose.Schema.ObjectId,
    ref: 'Showtime',
    required: [true, 'Booking must belong to a showtime'],
  },
  seats: [String],
  totalAmount: {
    type: Number,
    required: [true, 'Booking must have a total amount'],
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'wallet'],
    required: [true, 'Please provide payment method'],
  },
  paymentId: {
    type: String,
    required: [true, 'Please provide payment ID'],
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
});

// Populate user and showtime details
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email phone'
  }).populate({
    path: 'showtime'
  });
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);