module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'cornellred': '#b71b1b',
        'woodred': '#220303',
        'primary': '#941B00',
        'secondary': '#1D0207',
        'darkred': '#0D0000',        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
