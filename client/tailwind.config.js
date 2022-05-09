module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'woodred': '#220303',
        'primary': '#1D0207',
        'darkred': '#0D0000',        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
