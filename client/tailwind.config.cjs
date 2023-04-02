/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: "#ECF9FF",
        secondary: "#CF0A0A",
        tertiary_1: "#EB4D55",
        tertiary_2: "#333366",
      },
      maxWidth: {
        same: "80%",
      },
    },
    darkMode: "class",
    screens: {
      xs: "340px",
      ss: "620px",
      sm: "768px",
      md: "1120px",
      lg: "1400px",
      xl: "1550px",
    },
  },
  extend: {},
  plugins: [
    require("tailwindcss-debug-screens"),
    require("tw-elements/dist/plugin"),
  ],
};
