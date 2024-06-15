/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e85419",
        green: "#039228",
        blue: "#56bff4",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        spinnaker: ["Spinnaker", "sans-serif"],
      },
    },
  },
  plugins: [],
};
