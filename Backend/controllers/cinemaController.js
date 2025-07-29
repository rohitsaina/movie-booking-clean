const Cinema = require('../models/Cinema');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCinemas = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Cinema.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const cinemas = await features.query;

  res.status(200).json({
    status: 'success',
    results: cinemas.length,
    data: {
      cinemas,
    },
  });
});

exports.getCinemasByLocation = catchAsync(async (req, res, next) => {
  const { city } = req.query;
  
  const query = city ? { city: new RegExp(city, 'i') } : {};
  const cinemas = await Cinema.find(query);

  res.status(200).json({
    status: 'success',
    results: cinemas.length,
    data: {
      cinemas,
    },
  });
});

exports.getCinema = catchAsync(async (req, res, next) => {
  const cinema = await Cinema.findById(req.params.id);

  if (!cinema) {
    return next(new AppError('No cinema found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cinema,
    },
  });
});

exports.createCinema = catchAsync(async (req, res, next) => {
  const newCinema = await Cinema.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      cinema: newCinema,
    },
  });
});

exports.updateCinema = catchAsync(async (req, res, next) => {
  const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cinema) {
    return next(new AppError('No cinema found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cinema,
    },
  });
});

exports.deleteCinema = catchAsync(async (req, res, next) => {
  const cinema = await Cinema.findByIdAndDelete(req.params.id);

  if (!cinema) {
    return next(new AppError('No cinema found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});