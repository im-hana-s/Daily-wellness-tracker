import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FitbitCallback from "./pages/FitbitCallback";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tracker from "./pages/Tracker";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import AuthChoice from "./pages/AuthChoice";
import Water from "./pages/Water";
import Steps from "./pages/Steps";
import Todo from "./pages/Todo";
import Workout from "./pages/Workout";
import Calories from "./pages/Calories";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import JournalList from "./pages/Journal/JournalList";
import JournalEntry from "./pages/Journal/JournalEntry";
import JournalDetails from "./pages/Journal/JournalDetails";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const showNavbarFooter = !["/", "/auth-choice", "/login", "/register"].includes(path);
  const showAddButton =
    path === "/journal" || path === "/todo" || path === "/workout";

  const handleAddClick = () => {
    if (path === "/journal") navigate("/journal/new");
    else if (path === "/todo") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (path === "/workout") navigate("/workout");
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-white to-pink-100 relative overflow-hidden">
        <div className="sparkles absolute inset-0 z-0" />

        {showNavbarFooter && <Navbar />}

        <main className="flex-grow relative z-10 px-4 md:px-8 py-6 transition-all duration-500 ease-in-out">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Routes location={location} key={location.pathname}>
                {/* Welcome flow */}
                <Route path="/" element={<Welcome />} />
                <Route path="/auth-choice" element={<AuthChoice />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main app */}
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/water" element={<Water />} />
                <Route path="/steps" element={<Steps />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/calories" element={<Calories />} />
                <Route path="/fitbit/callback" element={<FitbitCallback />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reports" element={<Reports />} />

                {/* Journal */}
                <Route path="/journal" element={<JournalList />} />
                <Route path="/journal/new" element={<JournalEntry />} />
                <Route path="/journal/:id" element={<JournalDetails />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        {showAddButton && (
          <motion.button
            onClick={handleAddClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-16 right-6 md:right-10 bg-pink-400 text-white rounded-full p-4 shadow-lg hover:bg-pink-500 transition-all duration-300 flex items-center justify-center"
            style={{ boxShadow: "0 4px 15px rgba(255,145,175,0.35)" }}
          >
            <Plus size={28} className="drop-shadow-sm" />
            <div className="absolute -top-5 right-12 bg-white text-pink-600 text-xs px-3 py-1 rounded-full shadow-sm font-medium hidden md:block">
              {path === "/journal"
                ? "Add Entry 💕"
                : path === "/todo"
                ? "Add Task ✨"
                : "Add Workout 💪"}
            </div>
          </motion.button>
        )}

        {showNavbarFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}
