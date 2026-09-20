export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(10px, -10px) scale(1.05)" },
          "66%": { transform: "translate(-10px, 10px) scale(0.95)" },
        },
      },
    },
  },
  plugins: [],
};
