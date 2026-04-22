import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* tiny inline pixel icons (no external assets) */
function PixelHeart({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 16 16" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="6" y="0" width="4" height="4" fill="#f472b6" />
      <rect x="4" y="2" width="4" height="4" fill="#f9a8d4" />
      <rect x="8" y="2" width="4" height="4" fill="#f9a8d4" />
      <rect x="2" y="4" width="4" height="4" fill="#fecdd3" />
      <rect x="10" y="4" width="4" height="4" fill="#fecdd3" />
      <rect x="4" y="6" width="8" height="4" fill="#fff" opacity="0" />
    </svg>
  );
}

export default function JournalList() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    setEntries(saved ? JSON.parse(saved) : []);
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation(); // prevent navigation
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pink-100 rounded-lg p-2 border border-pink-200">
              <PixelHeart className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-semibold text-pink-700">Journal</h1>
          </div>

          <div>
            <button
              onClick={() => navigate("/journal/new")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-[1.02] transition-transform"
              aria-label="Add new entry"
            >
              <span className="text-sm font-medium">Add New Entry</span>
            </button>
          </div>
        </header>

        <main>
          {entries.length === 0 ? (
            <div className="rounded-2xl border border-pink-100 bg-white/80 p-10 text-center shadow-sm">
              <h2 className="text-xl font-medium text-pink-600 mb-2">No entries yet</h2>
              <p className="text-sm text-pink-400 mb-4">Start writing — your thoughts are safe here.</p>
              <button
                onClick={() => navigate("/journal/new")}
                className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full border border-pink-200 hover:bg-pink-200 transition"
              >
                Create first entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  onClick={() => navigate(`/journal/${entry.id}`)}
                  className="group relative cursor-pointer rounded-2xl bg-white border border-pink-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-pink-700 font-semibold text-lg mb-1">
                        {entry.text.length > 60 ? entry.text.slice(0, 60) + "…" : entry.text}
                      </h3>
                      <p className="text-sm text-pink-400">{entry.date}</p>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      <button
                        onClick={(e) => handleDelete(e, entry.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400 hover:text-pink-600 border border-transparent hover:border-pink-100 rounded-md px-2 py-1"
                        aria-label="Delete entry"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M3 6h18" stroke="#f9a8d4" strokeWidth="2" strokeLinecap="round" />
                          <path d="M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                          <path d="M10 11v6M14 11v6" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* small pixel-heart decoration top-right */}
                  <div className="absolute top-3 right-3 opacity-70">
                    <PixelHeart className="w-4 h-4" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
