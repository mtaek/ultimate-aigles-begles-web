module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#1e3a8a',
        accent: '#dc2626',
      }
    }
  },
  plugins: []
};