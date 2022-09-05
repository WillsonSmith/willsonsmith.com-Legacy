import { buildHtml } from "./html/index.js";
import { buildCss } from "./css/index.js";
import { copyStatic } from "./static/index.js";
import { buildJavascript } from "./javascript/index.js";

let [...argus] = process.argv;
let flags = {
  watch: argus.includes(`--watch`),
  minify: argus.includes(`--minify`),
};

const webPath = `./web`;
const distPath = `./web/dist`;

console.log(`BUILD • HTML • ${flags.watch ? `WATCHING` : `BUILDING`}`);
buildHtml(
  [
    {
      location: `${webPath}/index.html`,
      destination: `${distPath}/index.html`,
      ...{ flags },
    },
  ].map((config) => ({ ...config, ...flags }))
);

// Javascript
const jsConfig = [
  {
    location: `${webPath}/javascript/boot.js`,
    destination: `${distPath}/javascript/boot.js`,
  },
  {
    location: `${webPath}/javascript/routes/home-page.js`,
    destination: `${distPath}/routes/home-page.js`,
  },
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
