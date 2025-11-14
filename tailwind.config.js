/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3979aa",
        "background-light": "#f6f7f8",
        "background-dark": "#121720",
        "background-darker": "#0D1117",
        "surface-light": "#f3f4f6",
        "surface-dark": "#1f2937",
        "text-light-primary": "#111827",
        "text-dark-primary": "#f9fafb",
        "text-light-secondary": "#4b5563",
        "text-dark-secondary": "#d1d5db"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px"
      }
    }
  },
  plugins: [],
}
