import { ModuleLoader } from '@lit-labs/ssr/lib/module-loader.js';

export async function renderPage(modulePath: string, data: any) {
  const moduleLoader = new ModuleLoader();
  const importResult = await moduleLoader.importModule('./render-template.js', import.meta.url);

  const { createTempalteGenerator } = importResult.module
    .namespace as typeof import('./render-template.js');
  return createTempalteGenerator(modulePath, data);
}
