const Showtime = require('../models/Showtime');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllShowtimes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Showtime.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const showtimes = await features.query;

  res.status(200).json({
    status: 'success',
    results: showtimes.length,
    data: {
      showtimes,
    },
  });
});

exports.getShowtime = catchAsync(async (req, res, next) => {
  const showtime = await Showtime.findById(req.params.id);

  if (!showtime) {
    return next(new AppError('No showtime found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      showtime,
    },
  });
});

exports.createShowtime = catchAsync(async (req, res, next) => {
  const newShowtime = await Showtime.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      showtime: newShowtime,
    },
  });
});

exports.updateShowtime = catchAsync(async (req, res, next) => {
  const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!showtime) {
    return next(new AppError('No showtime found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      showtime,
    },
  });
});

exports.deleteShowtime = catchAsync(async (req, res, next) => {
  const showtime = await Showtime.findByIdAndDelete(req.params.id);

  if (!showtime) {
    return next(new AppError('No showtime found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});