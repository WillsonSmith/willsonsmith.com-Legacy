import { buildHtml } from './html/index.js';
import { buildCss } from './css/index.js';
import { copyStatic } from './static/index.js';
import { buildJavascript } from './javascript/index.js';

let [...flags] = process.argv;
flags = {
  watch: flags.includes(`--watch`),
  minify: flags.includes(`--minify`),
};

const webPath = `./web`;
const distPath = `./web/dist`;

console.log(`BUILD • HTML • ${flags.watch ? `WATCHING` : `BUILDING`}`);
buildHtml([
  {
    location: `${webPath}/index.html`,
    destination: `${distPath}/index.html`,
    ...{ flags },
  },
].map((config) => ({ ...config, ...flags })));

// Javascript
const jsConfig = [
  {
    location: `${webPath}/javascript/(._.).js`,
    destination: `${distPath}/javascript/(._.).js`,
  }
].map((config) => ({ ...config, ...flags }));

console.log(`BUILD • JAVASCRIPT • ${flags.watch ? `WATCHING` : `BUILDING`}`);
buildJavascript(jsConfig);

// Static assets
const staticConfig = [
  {
    location: `./node_modules/@shoelace-style/shoelace`,
    destination: `${distPath}/vendor/modules/shoelace`,
  },
  {
    location: `${webPath}/service-worker.js`,
    destination: `${distPath}/service-worker.js`,
  },
  {
    location: `${webPath}/static`,
    destination: `${distPath}/static`,
  },
  {
    location: `./shared/fonts`,
    destination: `${distPath}/fonts`,
  },
  {
    location: `${webPath}/site.webmanifest`,
    destination: `${distPath}/site.webmanifest`,
  }
].map((config) => ({ ...config, ...flags }));

console.log(`BUILD • STATIC • ${flags.watch ? `WATCHING` : `BUILDING`}`);
copyStatic(staticConfig);

const cssConfig = [
  {
    location: `${webPath}/css/main.css`,
    destination: `${distPath}/css/main.css`,
  },
].map((config) => ({ ...config, ...flags }));

console.log(`BUILD • CSS • ${flags.watch ? `WATCHING` : `BUILDING`}`);
buildCss(cssConfig);
