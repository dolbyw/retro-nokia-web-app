/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      colors: {
        'nokia-green': '#9BBB58',
        'nokia-dark-green': '#7A9B42',
        'nokia-light-green': '#AACCAA',
      },
      fontFamily: {
        'nokia': ['monospace'],
      },
    },
  },
  plugins: [],
};
