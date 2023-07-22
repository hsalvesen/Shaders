"use client";
import React, { useState } from "react";
import lightLogo from "../../assets/hazLogo.png";
import darkLogo from "../../assets/hazDarkThemeLogo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Toggle from "../ToggleBtn/Toggle";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "@/app/context/DarkContext";
import "./Navbar.css";
import { motion } from "framer-motion";
const Navbar = () => {
  const [hamburgerToggle, setHamburgerToggle] = useState(false);
  const { darkMode } = useDarkMode();

  const [isHovered, setIsHovered] = useState(null);
  const [isHovered2, setIsHovered2] = useState(null);
  const [isHovered3, setIsHovered3] = useState(null);
  const [isHovered4, setIsHovered4] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };
  const handleMouseEnter4 = () => {
    setIsHovered4(true);
  };

  const handleMouseLeave4 = () => {
    setIsHovered4(false);
  };


  let rotatingTextClass1;
  let rotatingTextClass2;
  let rotatingTextClass3;
  let rotatingTextClass4;
  if (isHovered === true) {
    rotatingTextClass1 = "rotating-text-hovered1";
  } else if (isHovered === false) {
    rotatingTextClass1 = "rotating-remove-text1";
  } else {
    rotatingTextClass1 = "another-class";
  }
  if (isHovered2 === true) {
    rotatingTextClass2 = "rotating-text-hovered2";
  } else if (isHovered2 === false) {
    rotatingTextClass2 = "rotating-remove-text2";
  } else {
    rotatingTextClass2 = "another-class2";
  }
  if (isHovered3 === true) {
    rotatingTextClass3 = "rotating-text-hovered3";
  } else if (isHovered3 === false) {
    rotatingTextClass3 = "rotating-remove-text3";
  } else {
    rotatingTextClass3 = "another-class";
  }
  if (isHovered4 === true) {
    rotatingTextClass4 = "rotating-text-hovered1";
  } else if (isHovered4 === false) {
    rotatingTextClass4 = "rotating-remove-text1";
  } else {
    rotatingTextClass4 = "another-class";
  }
  return (
    <div>
      <div
        className={`w-full  fixed top-[0px] z-50 ${
          darkMode ? " text-white" : "text-black"
        } `}
      >
        <div className="w-full    px-[18px] sm:px-[20px] md:px-[26px]  lg:px-20  mx-auto h-[95px] md:h-[90px] lg:h-[95px] pt-8 md:pt-6 lg:pt-6">
          <div className="flex  justify-between items-center">
            <Link href="/">
              {darkMode ? (
                <Image
                  priority={true}
                  className="w-10 h-10"
                  src={lightLogo}
                  alt="logo_Img"
                />
              ) : (
                <Image
                  priority={true}
                  className="w-10 h-10"
                  src={darkLogo}
                  alt="logo_Img"
                />
              )}
            </Link>
            {/* <h1 className="text-[26px]">Syncs</h1>*/}
            <ul className="hidden lg:flex gap-20">
              <Link
                href="/"
                className="text-[16px]  font-medium cursor-pointer"
              >
                <div
                  id="box"
                  className={rotatingTextClass1}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div>
                    <span>H</span>
                    <span>o</span>
                    <span>m</span>
                    <span>e</span>
                  </div>
                </div>
              </Link>
              <Link
                href="/about"
                className="text-[16px]  font-medium cursor-pointer"
              >
                  <div
                  id="box"
                  className={rotatingTextClass3}
                  onMouseEnter={handleMouseEnter3}
                  onMouseLeave={handleMouseLeave3}
                >
                  <div>
                   <span>A</span>
                    <span>b</span>
                    <span>o</span>
                    <span>u</span>
                    <span>t</span>
                  </div>
                </div>
        
              </Link>
              <Link
                href="/projects"
                className="text-[16px]  font-medium cursor-pointer"
              >
                <div
                  id="box"
                  className={rotatingTextClass2}
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                >
                  <div>
                    <span>P</span>
                    <span>r</span>
                    <span>o</span>
                    <span>j</span>
                    <span>e</span>
                    <span>c</span>
                    <span>t</span>
                    <span>s</span>
                  </div>
                </div>
            
              </Link>
              <Link
                href="/case-studies"
                className="text-[16px]  font-medium cursor-pointer"
              >
                   <div
                  id="box"
                  className={rotatingTextClass4}
                  onMouseEnter={handleMouseEnter4}
                  onMouseLeave={handleMouseLeave4}
                >
                  <div>
                  <span>C</span>
                    <span>a</span>
                    <span>s</span>
                    <span>e </span>
                    <span>
                      <span></span>S
                    </span>
                    <span>t</span>
                    <span>u</span>
                    <span>d</span>
                    <span>i</span>
                    <span>e</span>
                    <span>s</span>
                  </div>
                </div>

              </Link>
            </ul>

            <div>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className={`lg:hidden w-[100%] h-screen border-none text-center md:w-full  flex ${
                  darkMode ? "bg-slate-900" : "bg-[#fff]"
                }   flex-col gap-12  fixed p-5 px-10  border border-blue-200 rounded right-[0px]  md:right-[0px]  ${
                  hamburgerToggle
                    ? "top-[96px] pt-[50px] md:pt-[40px]"
                    : "top-[-100%]"
                }  `}
              >
                <Link
                  href="/"
                  onClick={() => setHamburgerToggle(false)}
                  className={`text-[16px] md:text-[20px] ${
                    darkMode ? "text-[#fff]" : "text-[#000]"
                  } hover:text-blue-600 font-medium`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setHamburgerToggle(false)}
                  className={`text-[16px] md:text-[20px] ${
                    darkMode ? "text-[#fff]" : "text-[#000]"
                  } hover:text-blue-600 font-medium`}
                >
                  About
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setHamburgerToggle(false)}
                  className={`text-[16px] md:text-[20px] ${
                    darkMode ? "text-[#fff]" : "text-[#000]"
                  } hover:text-blue-600 font-medium`}
                >
                  Projects
                </Link>
                <Link
                  href="/case-studies"
                  onClick={() => setHamburgerToggle(false)}
                  className={`text-[16px] md:text-[20px] ${
                    darkMode ? "text-[#fff]" : "text-[#000]"
                  } hover:text-blue-600 font-medium`}
                >
                  Case Studies
                </Link>
                <Link
                  href="/connect"
                  onClick={() => setHamburgerToggle(false)}
                  className={`text-[16px] md:text-[20px] ${
                    darkMode ? "text-[#fff]" : "text-[#000]"
                  } hover:text-blue-600 font-medium`}
                >
                  Connect
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setHamburgerToggle(false)}
                  className={`text-[16px] md:text-[20px] ${
                    darkMode ? "text-[#fff]" : "text-[#000]"
                  } hover:text-blue-600 font-medium`}
                >
                  Contact
                </Link>
                <Toggle />
              </motion.ul>
              <div>
                <div className="hidden lg:flex  w-[290px] justify-between items-center">
                  <div className="w-[300px] flex justify-around items-center ">
                    <Link
                      href="/contact"
                      className="border-2 rounded  bg-transparent border-gray-700 px-6 py-2 text-center  cursor-pointer"
                    >
                      Contact
                    </Link>

                    <Link
                      href="/connect"
                      className={`rounded bg-black ${
                        darkMode ? "text-white" : "text-slate-200"
                      }    px-6 py-2.5  text-center  cursor-pointer`}
                    >
                      Connect
                    </Link>
                  </div>
                  <Toggle />
                </div>
                {hamburgerToggle ? (
                  <AiOutlineClose
                    onClick={() => setHamburgerToggle(!hamburgerToggle)}
                    className="text-[26px] duration-200  lg:hidden block "
                  />
                ) : (
                  <AiOutlineMenu
                    onClick={() => setHamburgerToggle(!hamburgerToggle)}
                    className="text-[26px]  duration-200 lg:hidden block "
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
