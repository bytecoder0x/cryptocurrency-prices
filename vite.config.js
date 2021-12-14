const { resolve } = require('path');
const { defineConfig } = require('vite');
const handlebars = require('vite-plugin-handlebars');

module.exports = defineConfig({
  root: 'src',
  base: '/cryptocurrency-prices/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        favorites: resolve(__dirname, 'src/favorites.html'),
        pools: resolve(__dirname, 'src/pools.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
