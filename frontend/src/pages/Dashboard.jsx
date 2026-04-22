import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StatCard({ title, link, children }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer rounded-2xl p-5 bg-white border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <span className="text-sm text-pink-500 font-bold">→</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function Dashboard() {
  const [calories, setCalories] = useState(0);
  const [goalCalories, setGoalCalories] = useState(2000);
  const [remaining, setRemaining] = useState(2000);

  useEffect(() => {
    // 🌸 Pull from localStorage (data synced from CaloriesTracker)
    const storedMeals = localStorage.getItem("mealEntries");
    const storedGoals = localStorage.getItem("userGoals");

    let totalCalories = 0;
    if (storedMeals) {
      const entries = JSON.parse(storedMeals);
      totalCalories = entries.reduce(
        (sum, meal) => sum + (meal.details?.calories || 0),
        0
      );
    }

    let goal = 2000;
    if (storedGoals) {
      const g = JSON.parse(storedGoals);
      goal = g.calories || 2000;
    }

    setCalories(totalCalories);
    setGoalCalories(goal);
    setRemaining(Math.max(goal - totalCalories, 0));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 🩷 Steps Card */}
      <StatCard title="Steps" link="/steps">
        <p className="text-2xl font-bold text-pink-600">6,243</p>
        <p className="text-sm text-gray-500 mt-2">Today • Goal: 8,000</p>
      </StatCard>

      {/* 🍓 Calories Card (Dynamic!) */}
      <StatCard title="Calories" link="/calories">
        <p className="text-2xl font-bold text-gray-900">
          {calories.toLocaleString()} kcal
        </p>
        <p
          className={`text-sm mt-2 font-medium ${
            calories > goalCalories ? "text-red-500" : "text-gray-500"
          }`}
        >
          Remaining: {remaining.toLocaleString()} kcal
        </p>

        {/* 🩷 Tiny Progress Bar */}
        <div className="mt-3 h-2 rounded-full bg-pink-100 overflow-hidden">
          <div
            style={{
              width: `${Math.min((calories / goalCalories) * 100, 100)}%`,
            }}
            className={`h-2 rounded-full transition-all duration-700 ${
              calories > goalCalories
                ? "bg-red-400"
                : "bg-gradient-to-r from-pink-400 to-pink-500"
            }`}
          />
        </div>
      </StatCard>

      {/* 💧 Water Card */}
      <StatCard title="Water" link="/water">
        <p className="text-2xl font-bold text-pink-600">5 / 8 glasses</p>
        <p className="text-sm text-gray-500 mt-2">Keep sipping ✨</p>
      </StatCard>

      {/* 📔 Journal */}
      <StatCard title="Journal" link="/journal">
        <p className="text-sm text-gray-700">
          Write a quick thought or gratitude note 🌸
        </p>
      </StatCard>

      {/* 🧸 To-Do */}
      <StatCard title="To-Do" link="/todo">
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Morning stretch</li>
          <li>Drink water</li>
          <li>Read 10 pages</li>
        </ul>
      </StatCard>

      {/* 💪 Workout */}
      <StatCard title="Workout" link="/workout">
        <p className="text-sm text-gray-700">20 min HIIT • 10 min cooldown</p>
      </StatCard>
    </div>
  );
}
