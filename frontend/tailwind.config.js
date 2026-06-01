/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pure: {
          green: "#1f8f43",
          leaf: "#36b85b",
          mint: "#eaf7ee",
          black: "#111412",
          ink: "#26302a",
          gray: "#f5f7f4",
          line: "#dfe8e0",
        },
      },
      boxShadow: {
        premium: "0 24px 60px rgba(17, 20, 18, 0.10)",
        card: "0 14px 40px rgba(31, 143, 67, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

