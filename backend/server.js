// server.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./models/User.js";
import Goal from "./models/Goal.js";
import workoutsRouter from "./routes/workouts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// --- Routes ---
app.use("/api/workouts", workoutsRouter);

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// --- Auth Helpers ---
const generateToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// --- Default Route ---
app.get("/", (req, res) => {
  res.send("🌸 Daily Wellness Tracker Backend Running!");
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
