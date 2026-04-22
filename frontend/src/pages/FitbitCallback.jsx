import React, { useEffect } from "react";

export default function FitbitCallback() {
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hash.get("access_token");
    if (accessToken) {
      localStorage.setItem("fitbitToken", accessToken);
      alert("Fitbit connected successfully 💖");
      window.location.href = "/workout"; // go back to your main app
    } else {
      alert("Failed to connect Fitbit 😢");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-pink-50 text-pink-600">
      <p>Connecting your Fitbit account... 💫</p>
    </div>
  );
}
