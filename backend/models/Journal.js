const mongoose = require("mongoose");

const JournalEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  headingBorderImage: { type: String }, // URL or filename
  attachments: [
    {
      type: { type: String, enum: ["link", "image", "audio", "video"], required: true },
      url: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JournalEntry", JournalEntrySchema);
