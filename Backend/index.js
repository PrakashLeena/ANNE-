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

export default app;

// ── Middleware ──
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  ...(process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(',') : []),
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .map((s) => s.trim());

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ──
app.use('/api/auth',      authRoutes);
app.use('/api/orders',    orderRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/contact',   contactRoutes);
app.use('/api/admin',     adminRoutes);
app.use('/api/upload',    uploadRoutes);

app.get('/', (_req, res) => res.json({ status: 'ok', message: 'Anne API is running' }));

// ── Health check ──
app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ── Error handler ──
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── DB + Start ──
export const start = async () => {
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

if (!process.env.VERCEL && process.argv[1] && process.argv[1].endsWith('index.js')) {
  start();
}
