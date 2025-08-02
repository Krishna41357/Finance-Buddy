// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
       keyframes: {
        'slide-out-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      colors: {
        emerald: {
          950: '#022c22',
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
        'bubble-rise': 'bubble-rise 6s linear infinite',
        'slide-out-left': 'slide-out-left 0.5s ease-in forwards',
      },
      blur: {
        '3xl': '64px',
      },
    },
  },
   plugins: [
    require('tailwind-scrollbar-hide'),
   ]
}}
