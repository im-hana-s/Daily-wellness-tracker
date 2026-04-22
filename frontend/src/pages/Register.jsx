import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name: name || email.split("@")[0], email };
    setUser(newUser);
    navigate("/home");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-semibold text-pink-600">Create account</h1>
        <p className="text-sm text-gray-500 mt-1">
          Join the cozy wellness club ✨
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="btn-pink w-full text-white font-medium"
          >
            Create account
          </button>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 font-medium">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
