import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

if (!admin.apps.length) {
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId:   process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    console.warn('⚠️ Firebase Admin not initialized: Missing FIREBASE_PROJECT_ID in .env');
  }
}

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    const adminUids = (process.env.ADMIN_UIDS || '').split(',').map(u => u.trim());
    if (!adminUids.includes(req.user.uid)) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

export default admin;
