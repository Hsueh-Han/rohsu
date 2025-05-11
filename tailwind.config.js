/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rps-base-text': '#303133',
        'rps-primary-light': '#7877ca',
        'rps-primary': '#58579a',
        'rps-primary-dark': '#3a3967',
        'rps-secondary-lighter': '#fbf8f0',
        'rps-secondary-light': '#f7e7ce',
        'rps-secondary': '#f4dcac',
        'rps-secondary-dark': '#f2d3a4',
        'rps-warnning': '#eeb25a',
        'rps-danger': '#f89898',
        'rps-success': '#95d475',
      }
    },
    fontFamily: {
      orbitron: ['"Orbitron"', ...defaultTheme.fontFamily.sans],
      audiowide: ['"Audiowide"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}

