import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Roofing', 'Masonry', 'Waterproofing', 'Home Improvements', 'General Construction', 'Other'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
  location: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  coverImage: {
    type: String,
    default: '',
  },
  beforeImage: {
    type: String,
    default: '',
  },
  afterImage: {
    type: String,
    default: '',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

projectSchema.index({ order: 1, featured: -1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
