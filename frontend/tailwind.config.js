/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F4",
        ink: {
          50: "#F4F5F6",
          100: "#E4E6E9",
          200: "#C7CBD1",
          300: "#9AA1AB",
          400: "#6B7280",
          500: "#4B5259",
          600: "#343A40",
          700: "#22272B",
          800: "#171A1D",
          900: "#0F1214",
        },
        ledger: {
          50: "#EEF5F2",
          100: "#D6E7DF",
          200: "#AECFC0",
          300: "#7FB39D",
          400: "#4F947C",
          500: "#2F6F5E",
          600: "#255A4C",
          700: "#1D473C",
          800: "#163730",
          900: "#102822",
        },
        gold: {
          100: "#F6EAD0",
          300: "#E0BD73",
          500: "#C99A3B",
          600: "#A87C29",
        },
        rose: {
          100: "#F5DFDA",
          300: "#DE9184",
          500: "#B4483A",
          600: "#983A2E",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
      },
    },
  },
  plugins: [],
};
