/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
          'landing-img': "url('./assets/landing-img.jpg')",
          'landing-img2': "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('./assets/landing-img.jpg')"
        },
        colors: {
            'main': '#F9F7F5',
            'button-blue': '#66C2C7',
            'button-light-blue': '#93D4D7',
            'button-blue-darker': '#4BB8BD',
            'button-pink': '#EE9FBC',
            'button-pink-darker': '#EA80A7',
            'button-yellow': '#EDAE3A',
            'button-yellow-darker': '#EDAE3A',
            'button-light-yellow': '#FFDD8F',
            'button-gold': '#FFAE00',
            'card': '#EFEAE6',
            'card-hover': '#E7E2DE',
            'content': '#291334',
            'shadow': '#000000',
            'footer': '#E8E8E8',
            'lighter': '#838583',
            'error-red': '#EF4444',
            'card-border': '#D3F3EE',
            'accent-primary': colors.teal,
            'accent-secondary': colors.violet,
            'accent-gray': colors.gray,
        },
    },
  },
  plugins: [],
}

