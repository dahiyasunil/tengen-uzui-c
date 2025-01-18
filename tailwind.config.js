/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#DDD0C8",
          300: "#CAB5A8",
          500: "#B79A88",
          700: "#A47F68",
        },
        grey: {
          100: "#808080",
          300: "#666666",
          500: "#4C4C4C",
          700: "#323232",
        },
      },
    },
    container: {
      center: true,
    },
    html: {},
  },
  plugins: [],
};
