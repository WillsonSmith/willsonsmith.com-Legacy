const litPlugin = require('@lit-labs/eleventy-plugin-lit');
const { asyncGlob, syncGlob } = require('./util/async-glob.cjs');
const { build: esbuild } = require('esbuild');

const { recentlyWatched } = require('./util/letterboxd.cjs');

const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
  const componentModules = syncGlob('./src/components/**/*.js');
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules,
  });

  const esbuildConfig = {
    format: 'esm',
    bundle: true,
    splitting: true,
    sourcemap: false,
    minify: false,
    allowOverwrite: true,
  };
  eleventyConfig.on('afterBuild', async () => {
    const files = await asyncGlob('src/components/**/*.js');
    esbuild({
      entryPoints: files,
      outdir: './_site/components',
      ...esbuildConfig,
    });

    esbuild({
      entryPoints: [
        'node_modules/@webcomponents/template-shadowroot/template-shadowroot.js',
      ],
      outdir: '_site/node_modules/@webcomponents/template-shadowroot',
      ...esbuildConfig,
    });

    esbuild({
      entryPoints: ['node_modules/lit/experimental-hydrate-support.js'],
      outdir: '_site/node_modules/lit',
      ...esbuildConfig,
    });
  });

  eleventyConfig.addLiquidFilter('imageDimensions', (value) => {
    const [width, height] = value.split('x');
    return `width="${width}" height="${height}"`;
  });

  eleventyConfig.addWatchTarget('src/components/');
  eleventyConfig.addWatchTarget('node_modules/lit');
  eleventyConfig.addWatchTarget(
    'node_modules/@webcomponents/template-shadowroot'
  );

  eleventyConfig.addWatchTarget('src/css');
  eleventyConfig.addPassthroughCopy('src/css');

  eleventyConfig.addWatchTarget('src/img');
  eleventyConfig.addPassthroughCopy('src/img');

  eleventyConfig.addGlobalData('letterboxd', async () => {
    const { posters } = await recentlyWatched('willsonsmith');
    for (const poster of posters) {
      let stats = await Image(poster.src, {
        widths: [300],
        urlPath: '/img/movie-posters',
        outputDir: './_site/img/movie-posters',
      });
      poster.src = stats.jpeg[0].url;
    }

    return {
      recentlyWatched: posters.slice(0, 11),
    };
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};
