import express from 'express';
import Fort from '../models/fort.js';
// import { verifyToken } from '../middleware/auth.js'; // optional JWT for protected routes

const router = express.Router();

// GET all forts
router.get('/', async (req, res) => {
  try {
    const forts = await Fort.find();
    res.json(forts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single fort by ID
router.get('/:id', async (req, res) => {
  try {
    const fort = await Fort.findById(req.params.id);
    if (!fort) return res.status(404).json({ message: 'Fort not found' });
    res.json(fort);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optional: create a new fort (protected route)
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const newFort = new Fort(req.body);
//     const savedFort = await newFort.save();
//     res.status(201).json(savedFort);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

export default router;
