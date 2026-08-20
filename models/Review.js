import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
    required: [true, 'Review text is required'],
    maxlength: [1000, 'Review text cannot be more than 1000 characters'],
  },
  source: {
    type: String,
    default: 'Manual',
  },
  sourceUrl: {
    type: String,
    default: '',
  },
  verified: {
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
}, {
  timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
