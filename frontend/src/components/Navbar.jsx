import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Bluetooth, Heart } from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBluetoothConnect = async () => {
    try {
      setConnecting(true);
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["fitness_machine", "device_information"],
      });

      await device.gatt.connect();
      setConnectedDevice(device.name || "Unknown Device");
      localStorage.setItem("connectedDevice", device.name || "Unknown Device");
      setConnecting(false);
    } catch (error) {
      console.error("Bluetooth connection failed:", error);
      alert("Unable to connect to a Bluetooth device 😢");
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("connectedDevice");
    setConnectedDevice(null);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
      <div className="max-w-5xl mx-auto flex items-center gap-4 p-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg text-pink-600 flex items-center gap-1">
          <Heart className="text-pink-500" size={18} />
          Daily Wellness
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 ml-6 text-sm">
          <Link to="/dashboard" className="text-gray-600 hover:text-pink-500 transition">
            Dashboard
          </Link>
          <Link to="/tracker" className="text-gray-600 hover:text-pink-500 transition">
            Tracker
          </Link>
          <Link to="/analytics" className="text-gray-600 hover:text-pink-500 transition">
            Analytics
          </Link>
        </div>

        {/* Spacer */}
        <div className="ml-auto flex items-center gap-4">
          {/* 🌸 Bluetooth Device Indicator */}
          <button
            onClick={connectedDevice ? handleDisconnect : handleBluetoothConnect}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium border transition ${
              connectedDevice
                ? "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200"
                : "border-pink-300 text-pink-600 hover:bg-pink-50"
            }`}
          >
            <Bluetooth size={16} />
            {connecting
              ? "Connecting..."
              : connectedDevice
              ? `${connectedDevice}`
              : "Connect"}
          </button>

          {/* Auth Controls */}
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-sm text-gray-700 hover:text-pink-600 transition"
              >
                👤 {user.name || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-md text-sm text-pink-600 border border-pink-200 hover:bg-pink-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-pink-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-pink-600 font-medium hover:text-pink-700 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
