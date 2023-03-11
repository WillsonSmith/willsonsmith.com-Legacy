const { build: esbuild } = require('esbuild');
const { glob } = require('glob');

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin((eleventyConfig) => {
    eleventyConfig.addTemplateFormats('html.js');
    eleventyConfig.addExtension('html.js', {
      compile: async (content, inputPath) => {
        const { collectResult } = await import('@lit-labs/ssr/lib/render-result.js');
        const { renderPage } = await import('./renderer/renderer.js');
        const { default: template, title, styles, hydratedComponents } = await import(inputPath);

        return async (data) => {
          const composedData = {
            ...data,
            title,
            styles,
            hydratedComponents,
          };

          const templateGenerator = await renderPage(template, composedData);
          const html = await collectResult(templateGenerator);
          return injectData(html, composedData);
        };
      },
    });
  });

  eleventyConfig.on('afterBuild', async () => {
    const files = (await glob('src/**/*.ts')).filter((file) => !file.includes('html.ts'));
    await esbuild({
      entryPoints: files,
      bundle: true,
      minify: true,
      sourcemap: true,
      outdir: '_site',
      splitting: true,
      format: 'esm',
      allowOverwrite: true,
    });
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};

function injectData(str, data) {
  const imports = data.hydratedComponents?.map((script) => `import('${script}');`).join('\n') || '';
  console.log(imports);
  return str.replace('<!-- inject:scripts -->', imports);
}
