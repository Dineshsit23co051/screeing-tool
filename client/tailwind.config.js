/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        calm: {
          50: '#f5f9ff',
          100: '#e9f1ff',
          500: '#7aa2ff',
          700: '#4d73c9'
        }
      }
    }
  },
  plugins: []
};
