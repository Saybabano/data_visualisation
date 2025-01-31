/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "rgb(175,225,175)",
        customRed: "rgb(255, 99, 132)"
      }
    },
  },
  plugins: [],

}