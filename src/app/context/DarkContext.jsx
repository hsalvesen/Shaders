// @/app/context/DarkContext.js
'use client'
import React, { createContext, useState } from 'react';

const DarkContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
};

export const useDarkMode = () => React.useContext(DarkContext);
