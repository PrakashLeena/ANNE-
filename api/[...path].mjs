import mongoose from 'mongoose';
import app from '../anne-server/index.js';

let mongoInitPromise;

async function initMongo() {
  if (mongoose.connection?.readyState === 1) return;
  if (!mongoInitPromise) {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      mongoInitPromise = Promise.resolve();
    } else {
      mongoInitPromise = mongoose.connect(mongoUri);
    }
  }

  try {
    await mongoInitPromise;
  } catch (err) {
    // If Mongo connection fails, we still allow the API to respond (degraded mode)
    console.warn('MongoDB connection failed (serverless degraded mode):', err?.message || err);
  }
}

export default async function handler(req, res) {
  await initMongo();
  return app(req, res);
}
