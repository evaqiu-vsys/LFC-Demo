/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lfc: {
          red: '#C8102E',
          white: '#FFFFFF',
          charcoal: '#1A1A1A',
          gold: '#D4AF37',
          green: '#00A878',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}