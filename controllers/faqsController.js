import FAQ from '../models/FAQ.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getFaqs = asyncHandler(async (req, res) => {
  const { published } = req.query;
  const filter = {};

  if (published !== undefined) filter.published = published === 'true';

  const faqs = await FAQ.find(filter).sort({ order: 1 });
  
  res.status(200).json({
    success: true,
    count: faqs.length,
    data: faqs,
  });
});

export const createFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'FAQ created successfully',
    data: faq,
  });
});

export const updateFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!faq) {
    throw new ApiError(404, 'FAQ not found');
  }

  res.status(200).json({
    success: true,
    message: 'FAQ updated successfully',
    data: faq,
  });
});

export const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  
  if (!faq) {
    throw new ApiError(404, 'FAQ not found');
  }

  res.status(200).json({
    success: true,
    message: 'FAQ deleted successfully',
  });
});
