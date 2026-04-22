import React, { useState } from "react";

export default function BluetoothStepConnector({ onData }) {
  const [deviceName, setDeviceName] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  const connectBluetooth = async () => {
    try {
      setError("");
      console.log("🔍 Scanning for Bluetooth devices...");

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["device_information", "heart_rate"],
      });

      setDeviceName(device.name || "Unknown Device");
      setConnected(true);

      // Try connecting to GATT server
      const server = await device.gatt.connect();

      // Try reading Heart Rate / Generic Data as example
      const service = await server.getPrimaryService("heart_rate");
      const characteristic = await service.getCharacteristic("heart_rate_measurement");
      const value = await characteristic.readValue();

      let stepsEstimate = value.getUint8(1) * 100; // simulate conversion
      onData(stepsEstimate);

      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        let updatedSteps = event.target.value.getUint8(1) * 100;
        onData(updatedSteps);
      });
      await characteristic.startNotifications();

      console.log("✅ Connected to:", device.name);
    } catch (err) {
      console.error("❌ Bluetooth connection failed:", err);
      setError("Failed to connect. Please ensure your device supports BLE and is nearby.");
    }
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={connectBluetooth}
        className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all ${
          connected
            ? "bg-green-400 text-white"
            : "bg-pink-400 hover:bg-pink-500 text-white"
        }`}
      >
        {connected ? `Connected: ${deviceName}` : "Connect Bluetooth Device"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
