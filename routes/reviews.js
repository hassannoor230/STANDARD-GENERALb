import express from 'express';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', protect, authorize('admin'), createReview);
router.put('/:id', protect, authorize('admin'), updateReview);
router.delete('/:id', protect, authorize('admin'), deleteReview);

export default router;
