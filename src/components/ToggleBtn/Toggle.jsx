// Toggle.jsx

import React from "react";
import { useDarkMode } from "@/app/context/DarkContext";

const Toggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="toggle-container">
      <button className="text-2xl " onClick={toggleDarkMode}>
        {darkMode ? "🔆" : "🌙"}
      </button>
    </div>
  );
};

export default Toggle;
