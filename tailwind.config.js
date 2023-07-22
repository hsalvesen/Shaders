/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        myprimary: "#222222",
      },
      fontFamily: {
        tFont: 'var(--font-space_Grotesk_title)',
        bFont: 'var(--font-JetBrains_body)',
      }
    },
  },
  plugins: [],
};