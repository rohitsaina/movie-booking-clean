const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a movie title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a movie description'],
  },
  genre: {
    type: [String],
    required: [true, 'Please provide at least one genre'],
  },
  language: {
    type: [String],
    required: [true, 'Please provide at least one language'],
  },
  duration: {
    type: String,
    required: [true, 'Please provide movie duration'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please provide release date'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  certification: {
    type: String,
    enum: ['U', 'UA', 'A', 'S'],
    default: 'UA',
  },
  poster: {
    type: String,
    required: [true, 'Please provide poster URL'],
  },
  banner: {
    type: String,
    required: [true, 'Please provide banner URL'],
  },
  trailerUrl: {
    type: String,
    required: [true, 'Please provide trailer URL'],
  },
  cast: [
    {
      name: String,
      role: String,
      photo: String,
    },
  ],
  director: {
    type: String,
    required: [true, 'Please provide director name'],
  },
  producer: {
    type: String,
    required: [true, 'Please provide producer name'],
  },
  music: {
    type: String,
    required: [true, 'Please provide music director name'],
  },
  status: {
    type: String,
    enum: ['upcoming', 'now_showing', 'ended'],
    default: 'upcoming',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movie', movieSchema);