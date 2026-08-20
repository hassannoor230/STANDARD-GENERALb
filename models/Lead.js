import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    trim: true,
  },
  propertyLocation: {
    type: String,
    required: [true, 'Property location is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
  preferredContactMethod: {
    type: String,
    enum: ['phone', 'email', 'either'],
    default: 'either',
  },
  attachment: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'archived'],
    default: 'new',
  },
  adminNotes: {
    type: String,
    default: '',
    maxlength: [2000, 'Admin notes cannot be more than 2000 characters'],
  },
}, {
  timestamps: true,
});

leadSchema.index({ status: 1, createdAt: -1 });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
