/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#1e1b4b', // indigo-950
        'accent-yellow': '#facc15', // yellow-400
        'surface': 'rgba(255, 255, 255, 0.1)',
        'surface-dark': 'rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming Inter is available or default
      }
    },
  },
  plugins: [],
}