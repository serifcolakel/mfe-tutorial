/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './packages/**/*.{js,ts,jsx,tsx}',
    './{src,pages,components,app}/**/*.{ts,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3366ff',
          50: '#f0f4ff',
          100: '#f0f4ff',
          200: '#d9e2ff',
          300: '#a6c1ff',
          400: '#598bff',
          500: '#3366ff',
          600: '#274bdb',
          700: '#1a34b8',
          800: '#102694',
          900: '#091c7a',
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
