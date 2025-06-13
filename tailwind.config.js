/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // tous les fichiers source dans /src
    "./public/index.html"          // si tu as un HTML statique
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
