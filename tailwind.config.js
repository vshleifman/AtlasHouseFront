const plugin = require('tailwindcss/plugin');

const padding = { 0.5: '.5rem', 1: '1rem', 1.5: '1.5rem', 2: '2rem', 2.5: '2.5rem', 3: '3rem', 4: '4rem' };

const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.5rem',
  1: '1rem',
  1.5: '1.5rem',
  2: '2rem',
  2.5: '2.5rem',
  3: '3rem',
  3.5: '3.5rem',
  4: '4rem',
  4.5: '4.5rem',
  5: '5rem',
  6: '6rem',
  7: '7rem',
  8: '8rem',
  9: '9rem',
  10: '10rem',
  15: '15rem',
  20: '20rem',
  22: '22rem',
  25: '25rem',
  30: '30rem',
  35: '35rem',
  40: '40rem',
  60: '60rem',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  full: '100%',
  init: 'initial',
};

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: { max: '37.5em' },
      md: { max: '56.25em' },
      lg: { max: '75em' },
      xl: { max: '112.5em' },
    },
    spacing,
    margin: padding,
    padding,
    colors: {
      navbar: 'var(--color-navbar)',
      hover: 'var(--color-hover)',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      success: 'var(--color-success)',
      error: 'var(--color-error)',
      'dark-gray': '#22333B',
      'light-gray': '#F0F3F5',
      white: '#fff',
      yellow: '#FFD100',
    },
    minWidth: spacing,
    maxWidth: spacing,
    minHeight: spacing,
    maxHeight: spacing,
    extend: {
      backgroundImage: theme => ({
        thinPlusSvg:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMXYtMTFoMXYxMWgxMXYxaC0xMXYxMWgtMXYtMTFoLTExdi0xaDExeiIvPjwvc3ZnPg==')",
        thickPlusSvg:
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMgMnY5aDl2MmgtOXY5aC0ydi05aC05di0yaDl2LTloMnptMi0yaC02djloLTl2Nmg5djloNnYtOWg5di02aC05di05eiIvPjwvc3ZnPg==')",
      }),
      translate: {
        px: '1px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities, theme, e }) => {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.custom-input': {
          'min-height': '5rem',
          'min-width': '60rem',
          border: '1px solid gray',
          margin: '2rem 0 0 0',
          padding: '1rem',
        },
      });

      const flexBasis = theme('flexBasis') ?? theme('width');

      const flexBasisUtilities = Object.entries(flexBasis).map(([key, value]) => ({
        [`.${e(`flex-basis-${key}`)}`]: {
          'flex-basis': value,
        },
      }));

      addUtilities(flexBasisUtilities);
    }),
  ],
};
