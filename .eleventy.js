const pluginPWA = require('eleventy-plugin-pwa');
const minify = require('minify');

module.exports = function(eleventyConfig) {
  /* configuring static files copy */
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/fonts');

  eleventyConfig.addPlugin(pluginPWA);

  eleventyConfig.addNunjucksAsyncFilter('cssmin', async (code, callback) => {
    const newCode = await minify.css(code);
    callback(null, newCode);
  });

  eleventyConfig.addWatchTarget('./src/css');

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
