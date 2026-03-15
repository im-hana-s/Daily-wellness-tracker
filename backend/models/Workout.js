// backend/models/Workout.js
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workoutType: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  calories: { type: Number, required: true },
}, { timestamps: true });

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
