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
            'button-light-blue': '#93D4D7',
            'button-blue': '#66C2C7',
            'button-blue-darker': '#4BB8BD',
            'button-pink-backup': '#EE9FBC',
            'button-pink-darker-backup': '#EA80A7',
            'button-pink': '#C4B5FD',
            'button-pink-darker': '#5B21B6',
            'button-yellow': '#EDAE3A',
            'button-yellow-darker': '#E39B17',
            'card': '#EFEAE6',
            'card-hover': '#E7E2DE',
            'content': '#291334',
            'shadow': '#000000',
            'footer': '#E8E8E8',
            'lighter': '#838583',
            'error-red': '#EF4444',
            'card-border': '#D3F3EE',
        },
    },
  },
  plugins: [],
}

