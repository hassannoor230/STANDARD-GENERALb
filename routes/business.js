import express from 'express';
import { getBusiness, updateBusiness } from '../controllers/businessController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBusiness);
router.put('/', protect, authorize('admin'), updateBusiness);

export default router;
