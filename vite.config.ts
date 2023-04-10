import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import { glob } from 'glob';

const htmlFiles = await glob('pyre/**/*.html');
console.log(Object.fromEntries(htmlFiles.map((file) => [file, file])));

export default defineConfig({
  root: 'pyre',
  publicDir: 'assets',
  plugins: [topLevelAwait()],
  build: {
    outDir: '../web',
    emptyOutDir: true,
    target: 'es2020',
    rollupOptions: {
      input: Object.fromEntries(htmlFiles.map((file) => [file, file])),
    },
  },
});
