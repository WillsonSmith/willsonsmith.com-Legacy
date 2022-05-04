import { build } from 'esbuild';
import { copy } from 'fs-extra';
import chokidar from 'chokidar';
const [, , watchOrBuild, file] = process.argv;

const builds = {
  static: async (watch = false) => {
    copy(
      './node_modules/@shoelace-style/shoelace',
      './web/assets/vendor/shoelace'
    );
    copy('./service-worker.js', './web/service-worker.js');
    await copy('./assets/static', './web/assets/static');
    if (!watch) return;
    chokidar
      .watch('./assets/static')
      .on('change', (path) => {
        copy(path, `./web/${path}`);
      })
      .on('add', (path) => {
        copy(path, `./web/${path}`);
      })
      .on('unlink', (path) => {});
  },
  html: (watch = false) => {
    copy('./index.html', './web/index.html');
    if (!watch) return;
    chokidar.watch('./index.html').on('change', () => {
      copy('./index.html', './web/index.html');
    });
  },
  js: async (watch = false) => {
    build({
      entryPoints: ['./assets/js/index.js'],
      bundle: true,
      format: 'esm',
      outfile: './web/assets/js/index.js',
      minify: !watch,
      watch,
    });
  },
  css: (watch = false) => {
    build({
      entryPoints: ['./assets/css/main.css'],
      bundle: true,
      outfile: './web/assets/css/main.css',
      minify: !watch,
      watch,
    });
  },
};

switch (watchOrBuild) {
  case 'watch':
    builds[file](true);
    break;
  case 'build':
    builds[file]();
    break;
  default:
    console.log('Usage: node build.js [watch|build] [js|css]');
    break;
}
