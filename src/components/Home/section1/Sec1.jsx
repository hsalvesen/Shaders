"use client";
import { useDarkMode } from "@/app/context/DarkContext";
import "./style.css";
const Sec1 = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
      <div className="parent">
        <div className="banner-text  w-[90%]">
          <h1 className="text-[40px]  md:text-[90px] font-semibold  text-center mb-10">
            {" "}
            SALVESEN
          </h1>
          <p className=" text-center mx-auto  w-[100%] md:w-[600px] text-[14px] md:text-[18px]">
            The Sydney Computing Society is a student organisation that aims to
            provide an inclusive place for like-minded individuals interested in
            computing.
          </p>
          <div className="flex justify-between items-center w-[300px]  md:w-[330px]    m-auto mt-20 md:mt-12">
            <button className="text-[15px]   w-[150px]  md:w-[160px] rounded-md hover:bg-[#fff] hover:text-[#000] duration-200 bg-transparent  font-semibold  py-2  shadow border-white border">
            Connect
            </button>
            <button className="text-[15px] w-[150px]  md:w-[160px] rounded-md  bg-transparent  font-semibold  py-2  ">
            Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sec1;
