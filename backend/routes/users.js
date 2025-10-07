import express from 'express';
import verifyUserToken from '../middleware/auth.js';
import User from '../models/user.js';

const router = express.Router();

// GET /users/me
router.get('/me', verifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash')
  .populate('visitedForts')
  .populate('wishlist');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
