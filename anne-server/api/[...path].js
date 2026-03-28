const mongoose = require('mongoose');

let mongoInitPromise;
let appPromise;

async function getApp() {
  if (!appPromise) {
    appPromise = import('../index.js').then((m) => m.default);
  }
  return appPromise;
}

async function initMongo() {
  if (mongoose.connection && mongoose.connection.readyState === 1) return;

  if (!mongoInitPromise) {
    const mongoUri = process.env.MONGODB_URI;
    mongoInitPromise = mongoUri ? mongoose.connect(mongoUri) : Promise.resolve();
  }

  try {
    await mongoInitPromise;
  } catch (err) {
    console.warn('MongoDB connection failed (serverless degraded mode):', err?.message || err);
  }
}

module.exports = async (req, res) => {
  await initMongo();
  const app = await getApp();
  return app(req, res);
};
