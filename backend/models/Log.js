import mongoose from 'mongoose';
const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true }, // YYYY-MM-DD
  waterGlasses: Number,
  steps: Number,
  sleepHours: Number,
  mood: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Log', logSchema);
