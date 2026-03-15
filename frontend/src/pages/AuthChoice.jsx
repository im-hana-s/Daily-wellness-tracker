import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-200 text-center p-8">
      <h1 className="text-5xl md:text-6xl font-bold text-pink-600 mb-10 drop-shadow-sm">
        Ready to Begin? 💕
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Choose an option to get started on your wellness journey.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => navigate("/register")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105 text-lg font-medium"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border-2 border-pink-500 text-pink-600 px-10 py-4 rounded-full shadow-md hover:bg-pink-50 transition-transform transform hover:scale-105 text-lg font-medium"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
