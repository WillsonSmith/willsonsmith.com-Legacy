const pluginPWA = require('eleventy-plugin-pwa');
const minify = require('minify');

module.exports = function(eleventyConfig) {
  /* configuring static files copy */
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/fonts');

  eleventyConfig.addPlugin(pluginPWA);

  eleventyConfig.addTransform('processCSS', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      const newCode = await minify.css(content);
      return newCode;
    }
    return content;
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
