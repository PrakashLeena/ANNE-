import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  contactEmail: { type: String, required: true },
  components: [{
    id: String,
    name: String,
    price: Number
  }],
  totalPrice: { type: Number, required: true },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
