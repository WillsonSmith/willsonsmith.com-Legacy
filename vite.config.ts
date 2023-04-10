import { defineConfig } from 'vite';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { glob } from 'glob';

const htmlFiles = await glob('pyre/**/*.html');

export default defineConfig({
  root: 'pyre',
  plugins: [minifyHTML.default()],
  build: {
    outDir: '../web',
    emptyOutDir: true,
    target: 'es2022',

    rollupOptions: {
      input: Object.fromEntries(htmlFiles.map((file) => [file, file])),
    },
  },
});
