/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      asap: ["Asap", "sans-serif"],
      "open-sans": ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        secondary: "#4972D2",
        "secondary-2": "#254099",
        primary: "#17224F",
        "icon-white": "#E1EEFB",
        "light-text": "#8285b3",
        "dark-text": "#262626",
        hover: "#EBEBEB",
        accent: "#E96F20",
      },
    },
  },
  plugins: [],
};
