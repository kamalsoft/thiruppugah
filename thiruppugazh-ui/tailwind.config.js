/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        murugan: {
          saffron: '#FF9933',
          red: '#990000',
          gold: '#D4AF37',
          dark: '#1A0000',
        }
      }
    },
  },
  plugins: [],
}
