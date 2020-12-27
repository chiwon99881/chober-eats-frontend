//tailwind.config.js 파일은 tailwind를 커스텀하기 위해 필요한 파일
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        lime: colors.lime
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
