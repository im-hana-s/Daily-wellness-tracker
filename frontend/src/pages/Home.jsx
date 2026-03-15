import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-100">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 mt-12 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}!` : ""} 🌸
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your personal wellness journey starts here — track your habits, reflect on your mood, 
          and grow into your healthiest self ✨
        </p>
      </motion.div>

      {/* Images Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-8 relative z-10"
      >
        {[
          "https://i.pinimg.com/736x/8f/4b/86/8f4b866b7354e8d890f7029f42254683.jpg",          
          "https://i.pinimg.com/736x/b2/b3/5e/b2b35e3c214f9c1b5ee0321ee5e02232.jpg",
          "https://i.pinimg.com/736x/8c/2f/9b/8c2f9bc8a130e39e9b5599380731eb6f.jpg",
          "https://i.pinimg.com/736x/3f/33/70/3f3370ebec20c68ad2a74f3bcff16638.jpg",
          "https://i.pinimg.com/736x/12/0f/ab/120fabf03183feef9721aaac3004f482.jpg",
          "https://i.pinimg.com/736x/f1/ca/47/f1ca4713acdd57f9759eca0c8ac04d8a.jpg",
        ].map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={src}
              alt="wellness"
              className="object-cover w-full h-60 md:h-72"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 mb-20 relative z-10"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition-all duration-300"
        >
          Go to Dashboard →
        </button>
      </motion.div>
    </div>
  );
}
