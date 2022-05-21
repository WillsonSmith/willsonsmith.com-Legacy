const litPlugin = require('@lit-labs/eleventy-plugin-lit');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: [
      'web/blog/components/component1.js',
    ],
  });

  return {
    dir: {
      input: 'web/blog',
      output: 'web/dist/blog',
    }
  }
};