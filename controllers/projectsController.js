import Project from '../models/Project.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProjects = asyncHandler(async (req, res) => {
  const { published, featured, category } = req.query;
  const filter = {};

  if (published !== undefined) filter.published = published === 'true';
  if (featured !== undefined) filter.featured = featured === 'true';
  if (category) filter.category = category;

  const projects = await Project.find(filter).sort({ order: 1, featured: -1 });
  
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});
