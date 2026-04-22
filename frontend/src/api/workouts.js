import axios from "axios";

const API_URL = "/api/workouts";

export const fetchWorkouts = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};

export const addWorkout = async (workoutData) => {
  const res = await axios.post(API_URL, workoutData, { withCredentials: true });
  return res.data;
};
