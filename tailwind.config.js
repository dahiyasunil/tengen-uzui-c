/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "beige-100": "#DDD0C8",
        "beige-300": "#CAB5A8",
        "beige-500": "#B79A88",
        "beige-700": "#A47F68",
        "grey-100": "#808080",
        "grey-300": "#666666",
        "grey-500": "#4C4C4C",
        "grey-700": "#323232",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
