const { defineConfig } = require('vite');
const handlebars = require('vite-plugin-handlebars');

module.exports = defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [handlebars()],
});
