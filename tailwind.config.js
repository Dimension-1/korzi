/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
      },
      width: {
        '120': '30rem', // 480px
      },
      height: {
        '120': '30rem', // 480px
      },
    },
  },
  plugins: [],
}