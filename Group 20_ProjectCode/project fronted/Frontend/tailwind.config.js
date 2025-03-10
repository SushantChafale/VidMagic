/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login-page': "url('/src/assets/img1.jpg')",
        'hom-page': "url('/src/assets/img2.jpg')"
         
      })
    },
  },
  plugins: [],
}

