/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}" 
    // Asegúrate de incluir todas las carpetas donde uses estilos
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'filer-blue': '#0077bf',
        'filer-blue2': '#89b0dd',
        'filer-grey': '#69737b',
        'filer-grey2': '#abb4ba',
        'filer-grey3': '#d2d6db',
      },
    },
  },
  plugins: [],
}