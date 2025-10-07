import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import Image from '../models/image.js';

const router = express.Router();

// Configure multer for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route   POST /upload
 * @desc    Upload an image to Cloudinary and save to MongoDB
 */
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;

    // Basic validations
    if (!name) return res.status(400).json({ error: 'Image name is required' });
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'image-gallery' },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Save image details to MongoDB
    const image = new Image({
      name,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error while uploading image' });
  }
});

/**
 * @route   GET /
 * @desc    Fetch all uploaded images
 */
router.get('/', async (req, res) => {
  try {
      const images = await Image.find().sort({ uploadedAt: -1 });
      
    res.status(200).json(images);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

export default router;
