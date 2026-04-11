/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Changed to Manrope!
        sans: ['Manrope', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}