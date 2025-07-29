const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide cinema name'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Please provide cinema location'],
  },
  address: {
    type: String,
    required: [true, 'Please provide cinema address'],
  },
  city: {
    type: String,
    required: [true, 'Please provide cinema city'],
  },
  amenities: [String],
  screens: [
    {
      name: String,
      type: {
        type: String,
        enum: ['regular', 'premium', 'imax', '4dx'],
        default: 'regular',
      },
      seatingCapacity: Number,
    },
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cinema', cinemaSchema);