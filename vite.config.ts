import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import { glob } from 'glob';

const htmlFiles = await glob('pyre/**/*.html');

export default defineConfig({
  root: 'pyre',
  plugins: [],
  build: {
    outDir: '../web',
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input: Object.fromEntries(htmlFiles.map((file) => [file, file])),
    },
  },
});
