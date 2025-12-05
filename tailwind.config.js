/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html",
            "./js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily:{
        'super' : ['Super\ Croissant', 'san-serif'],
        'ice' : ['Ice\ Cold', 'san-serif'],
        'metal' : ['Metal\ Glass', 'san-serif'],
      }
    },
  },
  plugins: [],
}

