const { build: esbuild } = require('esbuild');
const { glob } = require('glob');

const { resolve: resolvePath } = require('path');

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin((eleventyConfig) => {
    eleventyConfig.addTemplateFormats('html.js');
    eleventyConfig.addExtension('html.js', {
      compile: async (content, inputPath) => {
        const { collectResult } = await import('@lit-labs/ssr/lib/render-result.js');

        const { renderPage } = await import('./renderer/renderer.js');
        // const {
        //   default: template,
        //   title,
        //   styles,
        //   hydratedComponents,
        //   meta,
        //   // This import is cached and therefore this doesn't work as expected.
        // } = await import(inputPath);

        return async (data) => {
          // const composedData = {
          //   ...data,
          //   title,
          //   styles,
          //   hydratedComponents,
          //   meta,
          // };

          const { data: composedData, template: templateGenerator } = await renderPage(
            resolvePath(inputPath),
            data,
          );
          // const templateGenerator = await renderPage(resolvePath(inputPath), data);
          let str = '';

          // for await (const chunk of templateGenerator) {
          //   str += chunk;
          // }
          const html = await collectResult(templateGenerator);
          // return injectData(html, data);
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
  let output = str;

  if (data.meta) {
    output = str.replace('<!-- inject:meta -->', stringFromMetaObject(data.meta));
  }

  if (data.styles) {
    output = output.replace('<!-- inject:styles -->', data.styles);
  }

  return output.replace('<!-- inject:scripts -->', imports);
}

function stringFromMetaObject(meta) {
  return `
  <meta
  ${meta.map((metaObject) => {
    return Object.entries(metaObject)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  })}
  />`;
}
