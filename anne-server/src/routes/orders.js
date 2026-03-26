import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

// Get the authenticated user's orders
router.get('/mine', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.uid }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    // Note: Can be called without auth, so we identify by contactEmail and optional userId
    // But verifyToken will fail if no token. Let's make token optional here by decoding if present.
    // Instead of full requireAuth, we extract token manually:
    let userId = 'guest';
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const { verifyToken: vToken } = await import('../middleware/auth.js');
      // Hacky inline decode:
      const admin = (await import('firebase-admin')).default;
      try {
        const decoded = await admin.auth().verifyIdToken(authHeader.split(' ')[1]);
        userId = decoded.uid;
      } catch (e) { /* ignore */ }
    }

    const { components, totalPrice, notes, contactEmail } = req.body;
    const order = new Order({
      userId,
      components,
      totalPrice,
      notes,
      contactEmail
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// User cancel order (only their own)
router.patch('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.uid });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status !== 'pending') return res.status(400).json({ error: 'Only pending orders can be cancelled' });
    
    order.status = 'cancelled';
    order.updatedAt = Date.now();
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

export default router;
