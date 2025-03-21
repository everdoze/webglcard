/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: '#ade0e0',
        activeTextColor: '#e0ffff',
        panelBg: 'rgba(50, 98, 98, 0.55)',
        lightPanelBg: 'rgba(140, 218, 218, 0.55)',
        progressBarBg: '#3f7c7c',
        progressBarFore: '#88e5e5',
        primaryBg: '#326262',
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      typography: {
        DEFAULT: {
          css: {
            fontSmoothing: 'antialiased'
          }
        }
      }
    },
  },
  plugins: []
};
