/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBg: "#ffffff",
        darkBg: "#000000",
        lightText: "#000000",
        darkText: "#fafafa",
        grayIg: "#262626",
      },
      screens: {
        xs: "470px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
