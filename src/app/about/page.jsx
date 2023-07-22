"use client";
import PageTransition from "@/components/PageTransition/PageTransition";
import transition from "@/components/transition";
import { useDarkMode } from "../context/DarkContext";

const page = () => {
  const {darkMode} =useDarkMode()
  return (
    <div className={`flex justify-center items-center h-screen ${
      darkMode ? "bg-gray-900" : "bg-white"
    }`}>
          <h1 className={`${darkMode?"text-white":"text-black"}`}>About Page</h1>
      <PageTransition />
    </div>
  );
};
export default transition(page);
