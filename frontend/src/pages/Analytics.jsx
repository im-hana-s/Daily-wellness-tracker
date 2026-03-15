import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Analytics() {
  const [stepsData, setStepsData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  // 🌸 Load all entries from localStorage
  useEffect(() => {
    // Steps
    const steps = JSON.parse(localStorage.getItem("stepsHistory")) || [];
    setStepsData(steps);

    // Workouts
    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkoutData(workouts);

    // Meals (calorie intake)
    const meals = JSON.parse(localStorage.getItem("mealEntries")) || [];
    setMealData(meals);

    // Sleep entries (if you have them)
    const sleep = JSON.parse(localStorage.getItem("sleepEntries")) || [];
    setSleepData(sleep);

    // Weight logs
    const weight = JSON.parse(localStorage.getItem("weightEntries")) || [];
    setWeightData(weight);
  }, []);

  const renderChart = (title, data, dataKey, color, unit) => (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-pink-100">
      <h3 className="text-2xl font-semibold text-pink-600 mb-4">{title}</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f9c6d1" />
            <XAxis
              dataKey={
                data[0]?.day ? "day" : data[0]?.date ? "date" : "time" || "id"
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color }}
              name={unit}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-pink-400 italic">No data available yet 💭</p>
      )}
    </div>
  );

  // Prepare data formats for charts
  const formattedSteps =
    stepsData.length > 0
      ? stepsData
      : [
          { day: "Mon", steps: 0 },
          { day: "Tue", steps: 0 },
          { day: "Wed", steps: 0 },
          { day: "Thu", steps: 0 },
          { day: "Fri", steps: 0 },
          { day: "Sat", steps: 0 },
          { day: "Sun", steps: 0 },
        ];

  const formattedWorkouts = workoutData.map((w) => ({
    date: new Date(w.createdAt).toLocaleDateString(),
    calories: Number(w.calories),
  }));

  const formattedMeals = mealData.map((m) => ({
    time: m.time,
    calories: m.details.calories,
  }));

  const formattedSleep = sleepData.map((s) => ({
    date: s.date,
    hours: s.hours,
  }));

  const formattedWeight = weightData.map((w) => ({
    date: w.date,
    weight: w.weight,
  }));

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10 font-poppins px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">
          🌸 Wellness Analytics Dashboard
        </h1>

        {/* Steps */}
        {renderChart("Steps This Week", formattedSteps, "steps", "#ec4899", "Steps")}

        {/* Calories (Meals) */}
        {renderChart(
          "Calorie Intake (Meals)",
          formattedMeals,
          "calories",
          "#f472b6",
          "Calories"
        )}

        {/* Workouts */}
        {renderChart(
          "Workout Calories Burned",
          formattedWorkouts,
          "calories",
          "#f87171",
          "Calories Burned"
        )}

        {/* Sleep */}
        {renderChart("Sleep Schedule", formattedSleep, "hours", "#c084fc", "Hours")}

        {/* Weight */}
        {renderChart("Weight Progress", formattedWeight, "weight", "#a855f7", "Weight (kg)")}
      </div>
    </div>
  );
}
