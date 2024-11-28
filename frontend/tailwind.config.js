/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: "#6121B7",
        "light-blue": "#93CAD4",
        "light-green": "#05D9BB",
      },
    },
  },
  plugins: [],
};
