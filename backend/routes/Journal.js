const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");
const authenticate = require("../middleware/authenticate"); // Middleware to verify user token

// Get all entries for logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single entry by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({ _id: req.params.id, userId: req.user.id });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new journal entry
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, content, headingBorderImage, attachments } = req.body;

    const newEntry = new JournalEntry({
      userId: req.user.id,
      title,
      content,
      headingBorderImage,
      attachments,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
