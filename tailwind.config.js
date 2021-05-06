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
    spacing: {
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
      40: '40rem',
      60: '60rem',
    },
    margin: {
      0.5: '.5rem',
      1: '1rem',
      2: '2rem',
      4: '4rem',
    },
    padding: {
      0.5: '.5rem',
      1: '1rem',
      2: '2rem',
      4: '4rem',
    },
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
    extend: {
      backgroundImage: theme => ({
        thinPlusSvg:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMXYtMTFoMXYxMWgxMXYxaC0xMXYxMWgtMXYtMTFoLTExdi0xaDExeiIvPjwvc3ZnPg==')",
        thickPlusSvg:
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMgMnY5aDl2MmgtOXY5aC0ydi05aC05di0yaDl2LTloMnptMi0yaC02djloLTl2Nmg5djloNnYtOWg5di02aC05di05eiIvPjwvc3ZnPg==')",
      }),
      translate: {
        '1px': '1px',
      },
      minHeight: {
        3: '3rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
