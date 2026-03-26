import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Post from '../models/Post.js';

const router = express.Router();

// Get all feed posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch community posts' });
  }
});

// Create new post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { content, authorName } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });
    
    const post = new Post({
      authorUid: req.user.uid,
      authorName: authorName || req.user.email?.split('@')[0] || 'User',
      content
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like/unlike a post
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    const uid = req.user.uid;
    const idx = post.likes.indexOf(uid);
    if (idx === -1) post.likes.push(uid);
    else post.likes.splice(idx, 1);
    
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Add a comment to a post
router.post('/:id/comment', verifyToken, async (req, res) => {
  try {
    const { text, authorName } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text required' });
    
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    post.comments.push({
      authorUid: req.user.uid,
      authorName: authorName || req.user.email?.split('@')[0] || 'User',
      text
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to comment' });
  }
});

export default router;
