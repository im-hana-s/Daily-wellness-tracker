// backend/models/Goal.js
import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  calories: { type: Number, default: 2000 },
  protein: { type: Number, default: 50 },
  carbs: { type: Number, default: 250 },
  fat: { type: Number, default: 70 },
  fibre: { type: Number, default: 30 },
  sugar: { type: Number, default: 25 },
  vitamins: { type: String, default: "Meet daily RDA for A, C, D, B12" },
}, { timestamps: true });

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
