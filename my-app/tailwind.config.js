// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#022c22',
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
        'bubble-rise': 'bubble-rise 6s linear infinite',
      },
      blur: {
        '3xl': '64px',
      },
    },
  },
   plugins: [
    require('tailwind-scrollbar-hide'),
   ]
};
