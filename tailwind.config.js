/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0f",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#8b5cf6", // Violet-500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#3b82f6", // Blue-500
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Satoshi", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
