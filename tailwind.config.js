/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EEEEEE",
        main: "#47A992",
        second: "#2D3332",
        thrid: "#332F2D"
      }
    },
  },
  plugins: [
  ],
}