import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",  // ✅ make sure this matches your backend port
  withCredentials: true,
});

export const fetchGoals = async () => {
  const res = await API.get("/api/goals");
  return res.data;
};

export const saveGoals = async (goals) => {
  const res = await API.post("/api/goals", goals);
  return res.data;
};
