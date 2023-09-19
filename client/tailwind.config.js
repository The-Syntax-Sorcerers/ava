/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
            'error-red': '#EF4444',
        },
    },
  },
  plugins: [],
}

