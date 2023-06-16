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
        semigrayIg: "#303030",
      },
      screens: {
        xs: "470px",
        ...defaultTheme.screens,
      },
      animation: {
        fadeIn: "fadeIn .1s ease-in",
      },
      keyframes: (theme) => ({
        fadeIn: {
          "0%": { scale: "110%", opacity: 0 },
          "100%": { scale: "100%", opacity: 1 },
        },
      }),
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
