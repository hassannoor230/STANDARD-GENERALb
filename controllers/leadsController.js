import Lead from '../models/Lead.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendEmail } from '../services/emailService.js';

export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);

  try {
    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      subject: 'New Project Estimate Request',
      html: `
        <h2>New Estimate Request</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Email:</strong> ${lead.email || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${lead.projectType}</p>
        <p><strong>Property Location:</strong> ${lead.propertyLocation}</p>
        <p><strong>Description:</strong> ${lead.description}</p>
        <p><strong>Preferred Contact:</strong> ${lead.preferredContactMethod}</p>
        ${lead.attachment ? `<p><strong>Attachment:</strong> <a href="${lead.attachment}">View</a></p>` : ''}
      `,
    });
  } catch (emailError) {
    console.error('Email notification failed:', emailError);
  }

  res.status(201).json({
    success: true,
    message: 'Estimate request submitted successfully',
    data: lead,
  });
});

export const getLeads = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { projectType: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const leads = await Lead.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Lead.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: leads.length,
    total,
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    data: leads,
  });
});

export const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  res.status(200).json({
    success: true,
    data: lead,
  });
});

export const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  res.status(200).json({
    success: true,
    message: 'Lead updated successfully',
    data: lead,
  });
});

export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }

  res.status(200).json({
    success: true,
    message: 'Lead deleted successfully',
  });
});
