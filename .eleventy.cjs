const litPlugin = require('@lit-labs/eleventy-plugin-lit');
const { asyncGlob, syncGlob } = require('./util/async-glob.cjs');
const { build: esbuild } = require('esbuild');

const { recentlyWatched } = require('./util/letterboxd.cjs');

const { writeFile, readFile } = require('fs/promises');

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
  eleventyConfig.on('eleventy.after', async () => {
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
    const cachedData = await readFile('.cache/letterboxd.json', 'utf-8').catch(
      () => null
    );

    if (cachedData) {
      console.log('Using cached data');
      if (cachedData.date < Date.now() - 1000 * 60 * 60 * 24) {
        return JSON.parse(cachedData);
      }
    }

    const { posters } = await recentlyWatched('willsonsmith');
    for (const poster of posters) {
      let stats = await Image(poster.src, {
        formats: ['avif', 'webp', 'jpeg'],
        widths: [300],
        urlPath: '/img/movie-posters',
        outputDir: './_site/img/movie-posters',
      });
      poster.src = stats.jpeg[0].url;
      const sources = Image.generateObject(stats, {
        alt: poster.alt,
        loading: 'lazy',
        decoding: 'async',
      })
        .picture.filter((item) => Boolean(item.source))
        .map(({ source }) => ({ type: source.type, srcset: source.srcset }));
      poster.sources = sources;
    }

    const result = {
      recentlyWatched: posters.slice(0, 11),
      date: Date.now(),
    };

    await writeFile('./.cache/letterboxd.json', JSON.stringify(result));

    return result;
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};
