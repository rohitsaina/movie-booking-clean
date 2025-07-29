const Feedback = require('../models/Feedback');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createFeedback = catchAsync(async (req, res, next) => {
  const { name, email, phone, rating, category, subject, message } = req.body;
  
  const feedback = await Feedback.create({
    user: req.user?.id,
    name,
    email,
    phone,
    rating,
    category,
    subject,
    message,
  });
  
  res.status(201).json({
    status: 'success',
    data: {
      feedback,
    },
  });
});

exports.getAllFeedback = catchAsync(async (req, res, next) => {
  const feedbacks = await Feedback.find().sort('-createdAt');
  
  res.status(200).json({
    status: 'success',
    results: feedbacks.length,
    data: {
      feedbacks,
    },
  });
});

exports.getFeedback = catchAsync(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new AppError('No feedback found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      feedback,
    },
  });
});

exports.deleteFeedback = catchAsync(async (req, res, next) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);

  if (!feedback) {
    return next(new AppError('No feedback found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});