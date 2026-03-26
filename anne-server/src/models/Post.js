import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  authorUid: { type: String, required: true }, // Firebase UID
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  authorUid: { type: String, required: true }, // Firebase UID
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  likes: [{ type: String }], // Array of Firebase UIDs
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);
