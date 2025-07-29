const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'Showtime must belong to a movie'],
  },
  cinema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cinema',
    required: [true, 'Showtime must belong to a cinema'],
  },
  screen: {
    type: String,
    required: [true, 'Please specify the screen'],
  },
  time: {
    type: String,
    required: [true, 'Please provide show time'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide show date'],
  },
  availableSeats: {
    type: Number,
    required: [true, 'Please provide available seats count'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide ticket price'],
  },
  status: {
    type: String,
    enum: ['available', 'almost_full', 'sold_out'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Populate movie and cinema details
showtimeSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'movie',
    select: 'title poster duration rating certification'
  }).populate({
    path: 'cinema',
    select: 'name location city'
  });
  next();
});

module.exports = mongoose.model('Showtime', showtimeSchema);