import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    maxlength: [200, 'Question cannot be more than 200 characters'],
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    maxlength: [2000, 'Answer cannot be more than 2000 characters'],
  },
  published: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

faqSchema.index({ order: 1 });

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
