import Review from '../models/Review.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getReviews = asyncHandler(async (req, res) => {
  const { published, featured, verified } = req.query;
  const filter = {};

  if (published !== undefined) filter.published = published === 'true';
  if (featured !== undefined) filter.featured = featured === 'true';
  if (verified !== undefined) filter.verified = verified === 'true';

  const reviews = await Review.find(filter).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Review created successfully',
    data: review,
  });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  res.status(200).json({
    success: true,
    message: 'Review updated successfully',
    data: review,
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
  });
});
