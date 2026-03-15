/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    workoutType: "",
    duration: "",
    calories: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const useOfflineFallback = true; // set to false when backend is ready

  // 🌸 Fetch workouts
  const fetchWorkouts = async () => {
    if (useOfflineFallback) {
      const saved = localStorage.getItem("workouts");
      setWorkouts(saved ? JSON.parse(saved) : []);
      return;
    }

    try {
      const res = await axios.get("/api/workouts", { withCredentials: true });
      setWorkouts(res.data);
    } catch {
      setError("Failed to load workouts");
    }
  };


  // 🩷 Handle form input
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 💪 Add new workout
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.workoutType || !form.duration || !form.calories) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      if (useOfflineFallback) {
        const newWorkout = {
          _id: Date.now().toString(),
          ...form,
          createdAt: new Date(),
        };
        const updated = [newWorkout, ...workouts];
        localStorage.setItem("workouts", JSON.stringify(updated));
        setWorkouts(updated);
        setForm({ workoutType: "", duration: "", calories: "" });
        setLoading(false);
        return;
      }

      await axios.post("/api/workouts", form, { withCredentials: true });
      setForm({ workoutType: "", duration: "", calories: "" });
      fetchWorkouts();
    } catch {
      setError("Failed to save workout");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete workout
  const handleDelete = async (id) => {
    if (useOfflineFallback) {
      const updated = workouts.filter((w) => w._id !== id);
      setWorkouts(updated);
      localStorage.setItem("workouts", JSON.stringify(updated));
      return;
    }

    try {
      await axios.delete(`/api/workouts/${id}`, { withCredentials: true });
      fetchWorkouts();
    } catch {
      setError("Failed to delete workout");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6 font-poppins">
      <h1 className="text-4xl font-bold mb-6 text-pink-600 drop-shadow-sm select-none">
        💖 Workout Tracker
      </h1>

      {/* 🩰 Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-md border border-pink-100"
      >
        <label className="block mb-3 text-pink-700 font-semibold">
          Workout Type
          <input
            type="text"
            name="workoutType"
            value={form.workoutType}
            onChange={handleChange}
            placeholder="E.g. Running, Yoga"
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </label>

        <label className="block mb-3 text-pink-700 font-semibold">
          Duration (minutes)
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="E.g. 45"
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </label>

        <label className="block mb-4 text-pink-700 font-semibold">
          Calories Burnt
          <input
            type="number"
            name="calories"
            value={form.calories}
            onChange={handleChange}
            placeholder="E.g. 300"
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </label>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 rounded-lg font-semibold shadow-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Workout"}
        </button>
      </form>

      {/* 🩷 Workout List */}
      <section className="mt-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4 select-none">
          Your Workouts
        </h2>

        {workouts.length === 0 && (
          <p className="text-pink-400 italic">No workouts logged yet.</p>
        )}

        <ul className="space-y-4">
          {workouts.map(({ _id, workoutType, duration, calories, createdAt }) => (
            <li
              key={_id}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition relative border border-pink-100"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-pink-700 font-bold text-lg">
                  {workoutType}
                </h3>

                {/* ❌ Delete Button */}
                <button
                  onClick={() => handleDelete(_id)}
                  className="text-pink-400 hover:text-pink-600 text-sm font-semibold ml-3"
                  title="Delete workout"
                >
                  ✕
                </button>
              </div>

              <time
                className="text-pink-400 text-sm italic"
                dateTime={createdAt}
                title={new Date(createdAt).toLocaleString()}
              >
                {new Date(createdAt).toLocaleDateString()}
              </time>

              <p className="text-pink-600">
                Duration:{" "}
                <span className="font-semibold">{duration} mins</span>
              </p>
              <p className="text-pink-600">
                Calories burnt:{" "}
                <span className="font-semibold">{calories} kcal</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default WorkoutTracker;
