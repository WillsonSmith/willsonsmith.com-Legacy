import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import { glob } from 'glob';

const htmlFiles = await glob('pyre/**/*.html');

export default defineConfig({
  root: 'pyre',
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
