import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fakeUser = {
      id: "fakeUserId",
      name: email.split("@")[0] || "User",
      email,
    };
    setUser(fakeUser);
    navigate("/home"); // ✅ Clean line
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-semibold text-pink-600">
          Welcome back 💕
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Log in to continue to your cozy wellness space
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="btn-pink w-full text-white font-medium"
          >
            Log in
          </button>

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
