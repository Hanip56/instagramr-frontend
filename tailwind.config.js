/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#ffffff",
        darkBg: "#000000",
        lightText: "#000000",
        darkText: "#fafafa",
        grayIg: "#262626",
      },
    },
  },
  plugins: [],
};
