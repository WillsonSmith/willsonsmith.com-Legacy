const pluginPWA = require('eleventy-plugin-pwa');

module.exports = function(eleventyConfig) {
  /* configuring static files copy */
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/fonts');

  eleventyConfig.addPlugin(pluginPWA);

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
