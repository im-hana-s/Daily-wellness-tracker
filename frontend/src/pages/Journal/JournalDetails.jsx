import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* tiny sparkle icon */
function Sparkle({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 2l1.5 3.5L17 7l-3.5 1.5L12 12 10.5 8.5 7 7l3.5-1.5L12 2z" fill="#f9a8d4" />
      <circle cx="19" cy="19" r="2" fill="#fecdd3"/>
    </svg>
  );
}

export default function JournalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const found = saved.find((e) => String(e.id) === String(id));
    setEntry(found || null);
  }, [id]);

  const handleDelete = () => {
    const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const updated = saved.filter((e) => String(e.id) !== String(id));
    localStorage.setItem("journalEntries", JSON.stringify(updated));
    navigate("/journal");
  };

  if (!entry) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl border border-pink-100 shadow">
          <h3 className="text-pink-600 font-medium mb-2">Entry not found</h3>
          <button onClick={() => navigate("/journal")} className="px-4 py-2 bg-pink-100 rounded-full text-pink-700">Back to list</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4 py-12 font-poppins">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-3xl p-8 border border-pink-100 shadow-lg relative">
        <div className="absolute top-6 right-6 opacity-80">
          <Sparkle className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-pink-700">Entry</h2>
            <p className="text-sm text-pink-400">{entry.date}</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/journal")} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Back</button>
            <button onClick={handleDelete} className="px-3 py-1 bg-pink-100 rounded-full text-sm text-pink-700 border border-pink-200">Delete</button>
          </div>
        </div>

        <article className="bg-pink-50 border border-pink-100 rounded-2xl p-6 text-gray-800 leading-relaxed whitespace-pre-wrap">
          {entry.text}
        </article>
      </div>
    </div>
  );
}
