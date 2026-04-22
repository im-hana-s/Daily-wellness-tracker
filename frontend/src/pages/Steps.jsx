import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Heart, Smartphone, Watch, Ruler, Bluetooth } from "lucide-react";

export default function Steps() {
  const [connected, setConnected] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [unit, setUnit] = useState("km");
  const [steps, setSteps] = useState(0);
  const [chartData, setChartData] = useState([
    { day: "Mon", steps: 0 },
    { day: "Tue", steps: 0 },
    { day: "Wed", steps: 0 },
    { day: "Thu", steps: 0 },
    { day: "Fri", steps: 0 },
    { day: "Sat", steps: 0 },
    { day: "Sun", steps: 0 },
  ]);

  // 🌸 Calculate total & distance
  const totalSteps = chartData.reduce((a, b) => a + b.steps, 0);
  const totalDistance = (totalSteps * 0.0008).toFixed(2); // avg 0.8m per step
  const distance =
    unit === "km"
      ? totalDistance
      : (totalDistance * 0.621371).toFixed(2);

  // 💖 Connect to Bluetooth device
  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["fitness_machine", "heart_rate", "device_information"],
      });

      setConnected(true);
      setDeviceName(device.name || "Unknown Device");

      const server = await device.gatt.connect();

      // 🩷 Try reading from a fitness-related service
      let stepCount = 0;

      try {
        const service = await server.getPrimaryService("fitness_machine");
        const characteristic = await service.getCharacteristic("step_count");
        const value = await characteristic.readValue();
        stepCount = value.getUint32(0, true);
      } catch {
        // fallback mock (if service not supported)
        stepCount = Math.floor(Math.random() * 20000 + 5000);
      }

      setSteps(stepCount);

      // Update chart dynamically
      const today = new Date().toLocaleString("en-US", { weekday: "short" });
      setChartData((prev) =>
        prev.map((d) =>
          d.day === today ? { ...d, steps: stepCount } : d
        )
      );
    } catch (error) {
      console.error(error);
      alert("Could not connect to device. Please try again 💕");
      setConnected(false);
    }
  };

  // 🌷 Auto-update mock data when disconnected
  useEffect(() => {
    if (!connected) {
      const interval = setInterval(() => {
        setChartData((prev) =>
          prev.map((d) => ({
            ...d,
            steps: Math.floor(Math.random() * 10000 + 4000),
          }))
        );
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [connected]);
  
  useEffect(() => {
  localStorage.setItem("stepsHistory", JSON.stringify(chartData));
}, [chartData]);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10 font-poppins">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] md:w-[700px] border border-pink-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
            <Heart className="text-pink-500" /> Steps Tracker
          </h2>

          <button
            onClick={connectBluetooth}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
              connected
                ? "bg-pink-200 text-pink-700"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            <Bluetooth size={16} />
            {connected ? `Connected to ${deviceName}` : "Connect Fitbit / Phone"}
          </button>
        </div>

        {/* Summary */}
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-pink-700">
            {steps.toLocaleString()} steps
          </p>
          <p className="text-sm text-gray-500">
            Total this week • {distance} {unit}
          </p>

          <div className="flex justify-center mt-3">
            <button
              onClick={() => setUnit("km")}
              className={`px-3 py-1 rounded-l-full border border-pink-300 ${
                unit === "km"
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-600"
              }`}
            >
              km
            </button>
            <button
              onClick={() => setUnit("miles")}
              className={`px-3 py-1 rounded-r-full border border-pink-300 ${
                unit === "miles"
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-600"
              }`}
            >
              miles
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-pink-100 p-4 rounded-xl mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f9c6d1" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="steps"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ r: 4, fill: "#ec4899" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Actions */}
        <div className="flex justify-around text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <Smartphone className="text-pink-400 mb-1" />
            <p>Sync with phone</p>
          </div>
          <div className="flex flex-col items-center">
            <Watch className="text-pink-400 mb-1" />
            <p>Track via Fitbit</p>
          </div>
          <div className="flex flex-col items-center">
            <Ruler className="text-pink-400 mb-1" />
            <p>View distance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
