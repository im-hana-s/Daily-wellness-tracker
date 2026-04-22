import React, { useEffect, useState } from "react";
import { fetchGoals, saveGoals } from "../api/goals";

// Default goal values
const defaultGoals = {
  calories: 2000,
  protein: 50,
  carbs: 250,
  fat: 70,
  fibre: 30,
  sugar: 25,
  vitamins: "Meet daily RDA for A, C, D, B12",
};

export default function CaloriesTracker() {
  // 🌸 Default nutrition summary (all start at 0)
  const [nutrition, setNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fibre: 0,
    sugar: 0,
    vitamins: "",
  });

  const [goals, setGoals] = useState(defaultGoals);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [meals, setMeals] = useState({ breakfast: "", lunch: "", dinner: "" });
  const [aiLoading, setAiLoading] = useState(false);
  const [mealEntries, setMealEntries] = useState([]); // 🍱 Store meal logs

  // 🩷 Load saved goals on mount
  useEffect(() => {
    async function loadGoals() {
      try {
        const fetchedGoals = await fetchGoals();
        setGoals(fetchedGoals || defaultGoals);
      } catch (err) {
        console.error(err);
        setError("Could not fetch goals from server — using defaults 💕");
      } finally {
        setLoading(false);
      }
    }
    loadGoals();

    const storedMeals = localStorage.getItem("mealEntries");
    if (storedMeals) setMealEntries(JSON.parse(storedMeals));
  }, []);

  // Handle goal input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoals((prev) => ({
      ...prev,
      [name]: name === "vitamins" ? value : value === "" ? "" : Number(value),
    }));
  };

  // Save goals
  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await saveGoals(goals);
      alert("Goals saved successfully! 💖");
      localStorage.setItem("userGoals", JSON.stringify(goals));
    } catch (err) {
      console.error(err);
      setError("Error saving goals — saved locally instead 🩷");
      localStorage.setItem("userGoals", JSON.stringify(goals));
    } finally {
      setSaving(false);
    }
  };

  // 🍱 AI-powered food analyzer using Edamam API
  const analyzeMeal = async (foodName) => {
    const appId = "nandhana"; // Replace with your actual App ID
    const appKey = "123456789"; // Replace with your actual App Key
    const cacheKey = `meal-${foodName.toLowerCase()}`;

    // Check local cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    try {
      const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
        foodName
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      // Validate response
      if (!data || !data.calories) throw new Error("No data returned");

      const result = {
        calories: Math.round(data.calories || 0),
        protein: Math.round(data.totalNutrients.PROCNT?.quantity || 0),
        carbs: Math.round(data.totalNutrients.CHOCDF?.quantity || 0),
        fat: Math.round(data.totalNutrients.FAT?.quantity || 0),
        fibre: Math.round(data.totalNutrients.FIBTG?.quantity || 0),
        sugar: Math.round(data.totalNutrients.SUGAR?.quantity || 0),
        vitamins: "A, B12 met",
      };

      localStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    } catch (error) {
      console.warn("AI nutrition fallback used:", error);

      // Fallback (rough estimates)
      const lower = foodName.toLowerCase();
      let calories = 150;
      if (lower.includes("idli")) calories += 60;
      if (lower.includes("sambar")) calories += 90;
      if (lower.includes("rice")) calories += 180;
      if (lower.includes("egg")) calories += 80;
      if (lower.includes("chicken")) calories += 250;

      return {
        calories,
        protein: Math.round(calories / 10),
        carbs: Math.round(calories / 5),
        fat: Math.round(calories / 20),
        fibre: Math.round(calories / 25),
        sugar: Math.round(calories / 30),
        vitamins: "",
      };
    }
  };

  // Handle AI meal add
  const handleAiAnalyze = async (mealType) => {
    setAiLoading(true);
    try {
      const foodName = meals[mealType];
      if (!foodName.trim()) return alert("Please enter a food name 🍱");

      const data = await analyzeMeal(foodName);

      // Update nutrition totals
      setNutrition((prev) => {
        const updated = { ...prev };
        for (const key of Object.keys(data)) {
          updated[key] =
            typeof data[key] === "number"
              ? (prev[key] || 0) + data[key]
              : data[key];
        }
        return updated;
      });

      // Log meal entry
      const entry = {
        id: Date.now(),
        mealType,
        food: foodName,
        details: data,
        time: new Date().toLocaleString(),
      };
      setMealEntries((prev) => {
        const updated = [entry, ...prev];
        localStorage.setItem("mealEntries", JSON.stringify(updated));
        return updated;
      });

      setMeals((prev) => ({ ...prev, [mealType]: "" }));
    } catch (err) {
      console.error(err);
      alert("Could not analyze meal 😢");
    } finally {
      setAiLoading(false);
    }
  };

  // Delete meal & recalculate totals
  const handleDeleteMeal = (id) => {
    setMealEntries((prev) => {
      const updated = prev.filter((m) => m.id !== id);

      // Recalculate totals
      const newTotals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fibre: 0,
        sugar: 0,
        vitamins: "",
      };
      updated.forEach((entry) => {
        for (const key of Object.keys(entry.details)) {
          if (typeof entry.details[key] === "number") {
            newTotals[key] += entry.details[key];
          }
        }
      });

      setNutrition(newTotals);
      localStorage.setItem("mealEntries", JSON.stringify(updated));
      return updated;
    });
  };

  // 🌸 Shimmer Loader
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 mt-20 text-center animate-pulse">
        <div className="h-8 w-2/3 bg-pink-200 rounded mx-auto mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-pink-100 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-pink-100 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-pink-100 rounded w-1/2 mx-auto" />
        </div>
        <p className="text-pink-500 mt-6">Loading your wellness data... 💫</p>
      </div>
    );
  }

  const nutrientList = ["calories", "protein", "carbs", "fat", "fibre", "sugar"];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 border border-pink-100">
      <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">
        Calories & Nutrition Tracker 🍓
      </h2>

     {/* 🩷 Calorie Summary Card — Fully Dynamic */}
<div className="mb-8 bg-white border border-pink-100 rounded-2xl shadow-sm p-6 flex justify-between items-center transition-all duration-300">
  <div>
    <h3 className="text-lg font-semibold text-gray-800">Calories</h3>
    <p className="text-3xl font-bold text-gray-900">
      {nutrition.calories?.toLocaleString() || 0} kcal
    </p>
    <p
      className={`mt-1 font-medium ${
        nutrition.calories > goals.calories
          ? "text-red-500"
          : "text-gray-500"
      }`}
    >
      Remaining:{" "}
      {Math.max((goals.calories || 0) - (nutrition.calories || 0), 0).toLocaleString()}{" "}
      kcal
    </p>
  </div>

  <div className="text-pink-400 text-xl font-bold">→</div>
</div>


      {/* 🩷 Meal Input Section */}
      <div className="mb-8 bg-pink-50 border border-pink-200 rounded-xl p-5 shadow-inner">
        <h3 className="text-pink-700 font-semibold mb-3">Add Your Meals</h3>
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <div key={meal} className="flex items-center mb-3">
            <label
              htmlFor={meal}
              className="capitalize w-24 text-pink-700 font-medium"
            >
              {meal}:
            </label>
            <input
              id={meal}
              type="text"
              value={meals[meal]}
              onChange={(e) =>
                setMeals((prev) => ({ ...prev, [meal]: e.target.value }))
              }
              placeholder={`e.g., Avocado toast, Smoothie, Idli & Sambar`}
              className="flex-grow p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 mr-2"
            />
            <button
              onClick={() => handleAiAnalyze(meal)}
              disabled={aiLoading}
              className="bg-pink-400 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-500 transition-all"
            >
              {aiLoading ? "..." : "Add"}
            </button>
          </div>
        ))}
      </div>

      {/* 🍱 Meal History with Delete Option */}
      {mealEntries.length > 0 && (
        <div className="mb-6 p-5 border border-pink-200 rounded-xl bg-pink-50 shadow-inner">
          <h3 className="text-pink-700 font-semibold mb-3">
            Today's Meals 💕
          </h3>
          <ul className="space-y-3">
            {mealEntries.map((entry) => (
              <li
                key={entry.id}
                className="p-3 rounded-lg border border-pink-100 bg-white flex justify-between items-center"
              >
                <div>
                  <p className="text-pink-700 font-medium capitalize">
                    {entry.mealType}: {entry.food}
                  </p>
                  <p className="text-sm text-pink-500">
                    {entry.details.calories} kcal,{" "}
                    {entry.details.protein}g protein,{" "}
                    {entry.details.carbs}g carbs
                  </p>
                  <p className="text-xs text-pink-400 mt-1">{entry.time}</p>
                </div>
                <button
                  onClick={() => handleDeleteMeal(entry.id)}
                  className="text-pink-500 hover:text-red-500 transition"
                  title="Delete meal"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🌸 Nutrition Summary */}
      <div className="mb-6 p-4 border border-pink-200 rounded-xl bg-pink-50 shadow-inner">
        <h3 className="text-pink-700 font-semibold mb-3">
          Today's Nutrition Summary
        </h3>
        <ul className="space-y-1 text-pink-700">
          {nutrientList.map((nutrient) => (
            <li key={nutrient} className="capitalize">
              {nutrient}: {nutrition[nutrient]}{" "}
              {nutrient === "calories" ? "kcal" : "g"}
            </li>
          ))}
          <li>Vitamins: {nutrition.vitamins || "—"}</li>
        </ul>
      </div>

      {/* Progress Bars */}
      <div className="mb-6">
        <h3 className="text-pink-700 font-semibold mb-3">
          Progress Towards Goals
        </h3>
        {nutrientList.map((nutrient) => {
          const consumed = nutrition[nutrient] || 0;
          const goal = goals[nutrient] || 1;
          const percentage = Math.min((consumed / goal) * 100, 100);
          return (
            <div key={nutrient} className="mb-3">
              <div className="flex justify-between mb-1 text-sm text-pink-600">
                <span className="capitalize">{nutrient}</span>
                <span>
                  {consumed} / {goal}{" "}
                  {nutrient === "calories" ? "kcal" : "g"}
                </span>
              </div>
              <div className="w-full bg-pink-200/60 rounded-full h-4 overflow-hidden">
                <div
                  style={{
                    width: `${percentage}%`,
                    background:
                      "linear-gradient(to right, #f9a8d4, #fbcfe8, #f472b6)",
                  }}
                  className="h-4 rounded-full transition-all duration-500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Goals Form */}
      <div className="p-6 border border-pink-300 rounded-xl bg-pink-100 shadow-inner">
        <h3 className="text-pink-600 font-semibold mb-4">
          Set Your Daily Goals
        </h3>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        {nutrientList.map((nutrient) => (
          <div key={nutrient} className="mb-4">
            <label
              className="block text-pink-700 font-medium mb-1 capitalize"
              htmlFor={nutrient}
            >
              {nutrient} ({nutrient === "calories" ? "kcal" : "g"})
            </label>
            <input
              id={nutrient}
              name={nutrient}
              type="number"
              min="0"
              value={goals[nutrient] === 0 ? "" : goals[nutrient]}
              onChange={handleInputChange}
              placeholder={`Enter goal for ${nutrient}`}
              className="w-full p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        ))}

        <div className="mb-4">
          <label
            className="block text-pink-700 font-medium mb-1"
            htmlFor="vitamins"
          >
            Vitamins Goal (mg / description)
          </label>
          <input
            id="vitamins"
            name="vitamins"
            type="text"
            value={goals.vitamins}
            onChange={handleInputChange}
            placeholder="e.g. Meet RDA for A, D, B12"
            className="w-full p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-pink-500 hover:to-pink-400 font-semibold transition-all"
        >
          {saving ? "Saving..." : "Save Goals 💾"}
        </button>
      </div>
    </div>
  );
}
