/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ECF9FF",
        secondary: "#CF0A0A",
        tertiary_1: "#EB4D55",
        tertiary_2: "#333366",
      },
    },
  },
  extend: {},
  plugins: [require("tailwindcss-debug-screens")],
};
