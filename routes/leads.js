import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from '../controllers/leadsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'lead-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, WEBP, PDF, DOC, DOCX allowed.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

router.post('/', upload.single('attachment'), createLead);
router.get('/', protect, authorize('admin'), getLeads);
router.get('/:id', protect, authorize('admin'), getLead);
router.put('/:id', protect, authorize('admin'), updateLead);
router.delete('/:id', protect, authorize('admin'), deleteLead);

export default router;
