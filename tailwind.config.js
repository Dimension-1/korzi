/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '2200px',
      },
      fontFamily: {
        'heading': ['Bebas Neue', 'cursive'],
        'body': ['DM Sans', 'sans-serif'],
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