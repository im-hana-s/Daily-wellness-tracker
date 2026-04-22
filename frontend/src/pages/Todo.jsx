import React, { useEffect, useState } from "react";

const motivationalQuotes = [
  "You got this! 🌸 Keep shining!",
  "Every step counts — keep going!",
  "Small progress is still progress!",
  "Believe in yourself and magic will happen ✨",
  "Stay strong, beautiful things are coming!",
  "You're doing amazing, don’t stop now!",
  "One task at a time, one dream closer 💕",
];

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState("");
  const [newTask, setNewTask] = useState("");

  // 🌸 Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userTodo");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // 💾 Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userTodo", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Add new task
  const addTask = () => {
    const text = newTask.trim();
    if (!text) return alert("Please enter a task 💕");
    const newEntry = {
      id: Date.now(),
      text,
      done: false,
    };
    setTasks((prev) => [...prev, newEntry]);
    setNewTask("");
  };

  // ❌ Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ✔️ Toggle task completion and show motivation
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );

    const task = tasks.find((t) => t.id === id);
    if (task && !task.done) {
      const random = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[random]);
    } else {
      setQuote("");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8 flex flex-col items-center font-poppins">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        Your To-Do List 💖
      </h1>

      {/* 🩷 Add new task */}
      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task ✨"
          className="flex-grow p-3 rounded-l-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-700"
        />
        <button
          onClick={addTask}
          className="bg-pink-500 text-white px-6 rounded-r-xl hover:bg-pink-600 transition-all font-semibold"
        >
          Add
        </button>
      </div>

      {/* 🌸 Task list */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border border-pink-100">
        {tasks.length === 0 ? (
          <p className="text-center text-pink-400 font-medium">
            No tasks yet — add one above 💕
          </p>
        ) : (
          tasks.map(({ id, text, done }) => (
            <div
              key={id}
              className="flex items-center justify-between mb-3 border-b border-pink-100 pb-2"
            >
              <label className="flex items-center space-x-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggleTask(id)}
                  className="h-5 w-5 text-pink-500 rounded border-pink-300 focus:ring-pink-400"
                />
                <span
                  className={`text-lg font-medium ${
                    done ? "line-through text-pink-300" : "text-pink-700"
                  }`}
                >
                  {text}
                </span>
              </label>

              {/* Delete button */}
              <button
                onClick={() => deleteTask(id)}
                className="text-pink-400 hover:text-pink-600 text-lg font-bold"
                title="Delete task"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* ✨ Motivation Quote */}
      {quote && (
        <div className="mt-6 max-w-md bg-pink-100 border border-pink-300 rounded-lg p-4 text-pink-700 font-semibold text-center shadow-inner animate-fadeIn">
          ✨ {quote} ✨
        </div>
      )}
    </div>
  );
}
