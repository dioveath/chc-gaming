module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
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
