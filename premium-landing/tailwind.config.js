export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0a0f1d', // Fondo principal más oscuro
        accent: '#7c3aed', // Púrpura vibrante
        subtle: '#94a3b8' // Texto secundario
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}