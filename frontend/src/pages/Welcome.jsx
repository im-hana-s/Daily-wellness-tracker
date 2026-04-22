import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/auth-choice");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-rose-50 to-white relative overflow-hidden font-poppins">
      {/* Floating pastel shapes */}
      <div className="absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 -top-16 -left-16 animate-pulse" />
      <div className="absolute w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-40 bottom-0 right-0 animate-pulse" />

      {/* Card content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 bg-white/80 backdrop-blur-md border border-pink-100 rounded-[2rem] shadow-lg p-12 w-[90%] max-w-2xl text-center transition-all hover:shadow-2xl hover:scale-[1.01]"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-6">
          Welcome to Daily Wellness Tracker 💕
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Your journey to mindfulness, fitness, and balance starts here.
        </p>

        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-pink-400 to-pink-500 text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform"
        >
          Next →
        </button>
      </motion.div>
    </div>
  );
}
