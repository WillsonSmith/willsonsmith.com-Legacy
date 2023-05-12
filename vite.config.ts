import { defineConfig } from 'vite';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { glob } from 'glob';

const htmlFiles = await glob('pyre/**/*.html');

export default defineConfig({
  root: 'pyre',
  plugins: [
    // Disable checi, minifyHTML does some weird things.
    // @ts-ignore-next-line
    // minifyHTML.default(),
    viteStaticCopy({
      targets: [
        {
          src: 'images/',
          dest: '',
        },
      ],
    }),
  ],
  build: {
    outDir: '../web',
    emptyOutDir: true,
    target: 'es2022',

    rollupOptions: {
      external: ['fs/promises', 'path', 'process'],
      input: Object.fromEntries(htmlFiles.map((file) => [file, file])),
    },
  },
});
