import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  // Load saved data from localStorage (if exists)
  const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};

  const [form, setForm] = useState({
    name: savedProfile.name || user?.name || "",
    email: savedProfile.email || user?.email || "",
    age: savedProfile.age || "",
    dob: savedProfile.dob || "",
    country: savedProfile.country || "",
    bio: savedProfile.bio || "",
    profilePic: savedProfile.profilePic || null,
  });

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(form));
  }, [form]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setForm({ ...form, profilePic: e.target.result });
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setForm({ ...form, profilePic: null });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(form));
    setUser({ ...user, name: form.name, email: form.email });
    alert("Profile saved successfully! 💾");
  };

  const countries = [
    "India", "United States", "Canada", "United Kingdom", "Australia", "Germany", "France",
    "Italy", "Spain", "Brazil", "Japan", "China", "South Korea", "Singapore", "New Zealand",
    "Russia", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Mexico", "South Africa",
    "Indonesia", "Thailand", "Philippines", "Malaysia", "Vietnam", "Turkey", "United Arab Emirates"
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 py-10 px-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Your Profile 🌸</h2>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          {form.profilePic ? (
            <img
              src={form.profilePic}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-pink-300 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center text-gray-400 border-4 border-pink-200 rounded-full">
              <span className="text-5xl">👤</span>
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <label className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full cursor-pointer transition">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {form.profilePic && (
              <button
                onClick={handleRemovePhoto}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-full transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={saveProfile} className="space-y-4 text-gray-700">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="Full Name"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="Email"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="Age"
              min="1"
            />
            <input
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Country dropdown */}
          <select
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full p-3 border rounded-lg overflow-y-auto"
          >
            <option value="">Select your country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </select>

          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full p-3 border rounded-lg h-28"
            placeholder="Write a short bio..."
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-8 py-3 rounded-full shadow-md transition-all"
            >
              💾 Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
