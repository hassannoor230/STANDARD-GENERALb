import BusinessInfo from '../models/BusinessInfo.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getBusiness = asyncHandler(async (req, res) => {
  let business = await BusinessInfo.findOne();
  
  if (!business) {
    business = await BusinessInfo.create({});
  }

  res.status(200).json({
    success: true,
    data: business,
  });
});

export const updateBusiness = asyncHandler(async (req, res) => {
  let business = await BusinessInfo.findOne();
  
  if (!business) {
    business = await BusinessInfo.create(req.body);
  } else {
    Object.assign(business, req.body);
    await business.save();
  }

  res.status(200).json({
    success: true,
    message: 'Business information updated successfully',
    data: business,
  });
});
