/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0e7490",
        secondary: "#4338ca",
        danger: "#be123c",
      },
    },
    plugins: [require("@tailwindcss/forms")],
  },
};
