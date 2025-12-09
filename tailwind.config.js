/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        technology: '#3498db',
        games: '#e74c3c',
        anime: '#9b59b6',
        entertainment: '#f39c12',
        niche: '#1abc9c',
      },
    },
  },
  plugins: [],
}