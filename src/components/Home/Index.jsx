"use client";
import Sec1 from "./section1/Sec1";
import transition from "@/components/transition";
import { useDarkMode } from "@/app/context/DarkContext";

const Index = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
    >
      <Sec1 />
    </div>
  );
};
export default transition(Index);
