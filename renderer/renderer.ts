import { ModuleLoader } from '@lit-labs/ssr/lib/module-loader.js';

export async function renderPage(page: any, data: any) {
  const moduleLoader = new ModuleLoader();
  const importResult = await moduleLoader.importModule('./render-template.js', import.meta.url);
  console.log(page);
  const { renderTemplate } = importResult.module.namespace as typeof import('./render-template.js');
  return renderTemplate(page, data);
}
