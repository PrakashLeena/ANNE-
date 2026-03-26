import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import authRoutes      from './src/routes/auth.js';
import orderRoutes     from './src/routes/orders.js';
import communityRoutes from './src/routes/community.js';
import contactRoutes   from './src/routes/contact.js';
import adminRoutes     from './src/routes/admin.js';
import uploadRoutes    from './src/routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.CLIENT_URL].filter(Boolean),
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ──
app.use('/api/auth',      authRoutes);
app.use('/api/orders',    orderRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/contact',   contactRoutes);
app.use('/api/admin',     adminRoutes);
app.use('/api/upload',    uploadRoutes);

// ── Health check ──
app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ── Error handler ──
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── DB + Start ──
const start = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anne';
    await mongoose.connect(mongoUri);
    console.log('✅  MongoDB connected');
    app.listen(PORT, () => console.log(`🚀  Anne server running on http://localhost:${PORT}`));
  } catch (err) {
    console.warn('⚠️  MongoDB connection failed. Starting server in degraded mode:', err.message);
    app.listen(PORT, () => console.log(`🚀  Anne server running on http://localhost:${PORT} (without DB)`));
  }
};

start();
