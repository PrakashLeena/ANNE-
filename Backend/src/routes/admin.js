import express from 'express';
import { requireAdmin } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

// Apply admin middleware to all routes in this file
router.use(requireAdmin);

// Get all orders across the platform
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin orders' });
  }
});

// Update order status
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending','in-progress','completed','cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status, updatedAt: Date.now() }, 
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Remove an order entirely
router.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

export default router;
