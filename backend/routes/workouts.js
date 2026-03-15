// backend/routes/workouts.js
import express from "express";
const router = express.Router();

let workouts = []; // temporary storage

// GET all workouts
router.get("/", (req, res) => {
  res.json(workouts);
});

// POST a new workout
router.post("/", (req, res) => {
  const { workoutType, duration, calories } = req.body;
  if (!workoutType || !duration || !calories) {
    return res.status(400).json({ message: "All fields required" });
  }
  const newWorkout = {
    _id: Date.now().toString(),
    workoutType,
    duration,
    calories,
    createdAt: new Date(),
  };
  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

export default router;
