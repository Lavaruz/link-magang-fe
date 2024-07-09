/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        background: "#EEEEEE",
        main: "#47A992",
        second: "#7A3E3E",
        thrid: "#482121"
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}