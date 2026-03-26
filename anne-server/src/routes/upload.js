import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  // Mock upload placeholder - implement Cloudinary or S3 here when needed
  res.json({ url: 'https://via.placeholder.com/150' });
});

export default router;
