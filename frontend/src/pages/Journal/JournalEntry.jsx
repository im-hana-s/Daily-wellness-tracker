import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* small decorative SVGs */
function Bow({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4 12c3-3 6-3 8-1 2-2 5-2 8 1" stroke="#f9a8d4" strokeWidth="1.5" fill="none"/>
      <circle cx="6" cy="12" r="2.4" fill="#f472b6"/>
      <circle cx="18" cy="12" r="2.4" fill="#f472b6"/>
      <rect x="10" y="10" width="4" height="4" rx="1" fill="#fecdd3"/>
    </svg>
  );
}

export default function JournalEntry() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!text.trim()) {
      alert("Please write something before saving.");
      return;
    }
    const newEntry = { id: Date.now(), text, date: new Date().toLocaleString() };
    const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
    localStorage.setItem("journalEntries", JSON.stringify([newEntry, ...saved]));
    navigate("/journal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4 py-12 font-poppins">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-3xl p-8 border border-pink-100 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bow className="w-8 h-8" />
            <h2 className="text-2xl font-semibold text-pink-700">New Journal Entry</h2>
          </div>
          <div className="text-sm text-pink-400">Your private space</div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write anything you want to remember — feelings, notes, gratitude, ideas..."
          className="w-full h-56 p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-300 outline-none resize-none text-gray-700 shadow-inner"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => navigate("/journal")}
            className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full shadow hover:scale-[1.02] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
