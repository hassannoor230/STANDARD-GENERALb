import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getServices = asyncHandler(async (req, res) => {
  const { published, featured, category, verified } = req.query;
  const filter = {};

  if (published !== undefined) filter.published = published === 'true';
  if (featured !== undefined) filter.featured = featured === 'true';
  if (category) filter.category = category;
  if (verified !== undefined) filter.verified = verified === 'true';

  const services = await Service.find(filter).sort({ order: 1, featured: -1 });
  
  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Service created successfully',
    data: service,
  });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.status(200).json({
    success: true,
    message: 'Service updated successfully',
    data: service,
  });
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});
