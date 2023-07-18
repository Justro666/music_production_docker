/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primaryColor: "#45DA97",
      secondaryColor: "#DB5B33",
      secondaryGray: "#49494e",
      secondaryRed: '#DD2424',
      secondaryBlue: '#419FE2',
      darkBlue: "#1C2331",
      tertiary: "#FFCC18",
      mainBg: "#201F1E",
      secondaryBg: '#49494E',
      white: "#fff",
      black: "#000"
    },
    fontFamily: {
      nunito: ['Nunito', 'sans-serif']
    },
    extend: {
      skew: {
        "30" : "30deg"
      }
    },
  },
  plugins: [],
}

