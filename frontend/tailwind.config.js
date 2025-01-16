/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include index.html for Tailwind processing
    "./src/**/*.{js,jsx,ts,tsx}", // Process all JS/TS/React files
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        navy: "#14213D",
        orange: "#FCA311",
        grayLight: "#E5E5E5",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
