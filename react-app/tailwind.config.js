export default {
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
        primary: '#2e86c1',
        secondary: '#f3982a',
      }
      ,
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        pulseSoft: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        gradientShift: 'gradientShift 8s ease infinite',
        pulseSoft: 'pulseSoft 5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};