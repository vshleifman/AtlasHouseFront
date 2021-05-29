module.exports = {
  babel: {
    plugins: ['babel-plugin-twin', 'babel-plugin-macros'],
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
