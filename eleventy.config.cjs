const { build: esbuild } = require('esbuild');
const { glob } = require('glob');

const { resolve: resolvePath } = require('path');

const { writeFile } = require('fs/promises');
module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin((eleventyConfig) => {
    eleventyConfig.addTemplateFormats('html.js');
    eleventyConfig.addExtension('html.js', {
      compile: async (_, inputPath) => {
        const { collectResult } = await import('@lit-labs/ssr/lib/render-result.js');
        const { renderPage } = await import('./renderer/renderer.js');
        return async (data) => {
          const { data: composedData, template: templateGenerator } = await renderPage(
            resolvePath(inputPath),
            data,
          );

          const html = await collectResult(templateGenerator);
          return injectData(html, composedData);
        };
      },
    });
  });

  eleventyConfig.addWatchTarget('./src/js');

  eleventyConfig.addWatchTarget('./src/**/components');

  eleventyConfig.on('afterBuild', async () => {
    console.log('afterBuild');
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

    const cssFiles = await glob('src/**/*.css.js');
    for (const file of cssFiles) {
      const path = `./${file}`;
      const { default: css } = await import(path);
      const output = path.replace('src', '_site').replace('.js', '');
      await writeFile(output, css.cssText, 'utf-8');
    }
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

  if (data.links) {
    output = output.replace('<!-- inject:links -->', stringsFromLinks(data.links));
  }

  if (data.meta) {
    output = output.replace('<!-- inject:meta -->', stringsFromMeta(data.meta));
  }

  if (data.styles) {
    output = output.replace('<!-- inject:styles -->', data.styles);
  }

  return output.replace('<!-- inject:scripts -->', imports);
}

function stringsFromLinks(links) {
  return links
    .map((link) => {
      return `
    <link
    ${Object.entries(link)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')}
    />`;
    })
    .join('\n');
}

function stringsFromMeta(links) {
  return links
    .map((link) => {
      return `
    <meta
    ${Object.entries(link)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')}
    />`;
    })
    .join('\n');
}
