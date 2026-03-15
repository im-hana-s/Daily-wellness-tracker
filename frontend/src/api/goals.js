import axios from "axios";

const API_BASE = "http://localhost:5000/api/goals";

// Fetch existing goals
export const fetchGoals = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

// Save or update user goals
export const saveGoals = async (goals) => {
  const response = await axios.post(API_BASE, goals);
  return response.data;
};
