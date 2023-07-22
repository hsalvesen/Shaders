// import React from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import logo from '../../assets/hazLogo.png';

// const PageTransition = () => {
//   return (
//     <div>
//       <motion.div
//         id="myElement"
//         initial={{ scaleY: 0, transformOrigin: 'top' }}
//         animate={{ scaleY: [1, 1, 0], transformOrigin: 'top' }}
//         transition={{ duration: 3, times: [0, 0.5, 0.5] }}
//       >
//         <motion.div
//           id="image"
//           style={{ opacity: 1 }}
//           animate={{ opacity: 0 }}
//           transition={{ duration: 0.6, delay: 1 }}
//         >
//           <motion.div
//             style={{ opacity: 0,width:"60px" }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0, delay: 0.6 }}
//           >
//             <Image priority={true} src={logo} alt="Logo" />
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default PageTransition;

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDarkMode } from "@/app/context/DarkContext";
import lightLogo from "../../assets/hazLogo.png";
import darkLogo from "../../assets/hazDarkThemeLogo.png";

const PageTransition = () => {
  const { darkMode } = useDarkMode();
  return (
    <div>
      <motion.div
        id="myElement"
        className={` ${darkMode ? "bg-[#0f3670]" : "bg-[#7FB6FF]"}`}
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{ scaleY: [1, 1, 0], transformOrigin: "top" }}
        transition={{ duration: 3, times: [0, 0.5, 0.5] }}
      >
        <motion.div
          id="image"
          style={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            style={{ opacity: 0, width: "60px" }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, delay: 0.6 }}
          >
            {darkMode ? (
              <Image priority={true} src={lightLogo} alt="Logo" />
            ) : (
              <Image priority={true} src={darkLogo} alt="Logo" />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageTransition;