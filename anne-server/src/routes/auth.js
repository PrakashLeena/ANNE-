import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Synchronize Firebase user to MongoDB
router.post('/sync', verifyToken, async (req, res) => {
  try {
    const { uid, email, name } = req.user;
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, email, displayName: name || email.split('@')[0] });
      await user.save();
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to sync user' });
  }
});

export default router;
