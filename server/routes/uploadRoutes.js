import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload a single product image from the admin's device
// @route   POST /api/upload
router.post('/', protect, admin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Publicly accessible path, served via express.static in server.js
    const imagePath = `/uploads/${req.file.filename}`;
    res.status(201).json({ image: imagePath });
  });
});

export default router;
