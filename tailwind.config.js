/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["sans-regular"],
      regular: ["sans-regular"],
      bold: ["sans-bold"],
      "bold-italic": ["sans-bold-italic"],
      "extra-light-italic": ["sans-extra-light-italic"],
      "extra-light": ["sans-extra-light"],
      italic: ["sans-italic"],
      "light-italic": ["sans-light-italic"],
      light: ["sans-light"],
      "medium-italic": ["sans-medium-italic"],
      medium: ["sans-medium"],
      "semi-bold-italic": ["sans-semi-bold-italic"],
      "semi-bold": ["sans-semi-bold"],
      "thin-italic": ["sans-thin-italic"],
      thin: ["sans-thin"],
      "nunito-black": ["nunito-black"],
    },
    extend: {
      colors: {
        "primary-dark": "#A044FF",
        "primary-darker": "#B616EE",
        grey: "#F9F8F8",
        "grey-darker": "#EBEBEB",
        "light-grey": "#E6E6E6",
        "dark-grey": "#383838",
        "blue-dark": "#281ACB",
        yellowNew: "#EDB506",
        "primary-light": "#D7AFFF",
      },
    },
  },
  plugins: [],
};
