import React, { useState } from "react";

const WaterTracker = () => {
  const maxLiters = 3; // max water amount in liters for full container

  // State for input, unit and fill percentage
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("liters");

  // Convert ounces to liters if needed
  const amountInLiters = unit === "liters" ? amount : amount * 0.0295735;

  // Calculate fill percentage based on max liters
  const fillPercent = Math.min((amountInLiters / maxLiters) * 100, 100);

  // Handle unit toggle
  const toggleUnit = () => {
    if (unit === "liters") {
      // Convert current amount liters -> ounces
      setAmount(amount / 0.0295735);
      setUnit("ounces");
    } else {
      // Convert current amount ounces -> liters
      setAmount(amount * 0.0295735);
      setUnit("liters");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "20px auto", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2 style={{color: "#f48fb1"}}>Water Consumption Tracker</h2>

      <div
        style={{
          height: 300,
          width: 120,
          border: "2px solid #f48fb1",
          borderRadius: 15,
          margin: "20px auto",
          position: "relative",
          backgroundColor: "#fff",
          overflow: "hidden",
          boxShadow: "0 0 10px #f48fb1"
        }}
      >
        {/* Water fill */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: `${fillPercent}%`,
            backgroundColor: "#f48fb1",
            transition: "height 0.5s ease-in-out",
            borderRadius: "0 0 15px 15px",
            boxShadow: "inset 0 5px 15px rgba(255,255,255,0.3)"
          }}
        />
      </div>

      <div>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount.toFixed(2)}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          style={{ padding: "10px", fontSize: "16px", width: "120px", borderRadius: "5px", border: "1px solid #f48fb1" }}
        />
        <span style={{ marginLeft: 8, fontWeight: "bold", color: "#f48fb1" }}>{unit}</span>
      </div>

      <button
        onClick={toggleUnit}
        style={{
          marginTop: 15,
          padding: "8px 16px",
          backgroundColor: "#f48fb1",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 5px rgba(244,143,177,0.6)"
        }}
      >
        Switch to {unit === "liters" ? "Ounces" : "Liters"}
      </button>
    </div>
  );
};

export default WaterTracker;

