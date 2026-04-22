// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Change this to your backend API base URL
  headers: {
    "Content-Type": "application/json",
    // You can add auth tokens here later if needed
  },
});

export default axiosInstance;
