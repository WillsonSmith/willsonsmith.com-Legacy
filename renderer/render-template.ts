import type { RenderResult } from '@lit-labs/ssr';

type Data = Record<string, unknown>;

import { render } from '@lit-labs/ssr';

export async function createTempalteGenerator(
  modulePath: string,
  data: Data,
): Promise<{
  data: Data;
  template: RenderResult;
}> {
  const {
    default: template,
    title = 'Document',
    styles,
    hydratedComponents,
    meta,
  } = await import(modulePath);

  const composedData = {
    ...data,
    title,
    styles,
    hydratedComponents,
    meta,
  };

  return {
    data: composedData,
    template: renderTemplate(template, composedData),
  };
}

export function* renderTemplate(template: (data: Data) => RenderResult, data: Data) {
  const { title = 'Document', styles } = data;
  yield `
    <!DOCTYPE html>
    <html lang="en">
      <head>
      <title>${title}</title>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- inject:meta -->
      </head>
      <body>
        <template shadowroot="open" shadowrootmode="open">
          <style>
            ${styles}
          </style>`;
  yield* render(template(data));
  yield `
        </template>
        <script type="module">
          import { hydrateShadowRoots } from "/js/hydrate.js";
          await hydrateShadowRoots();
          <!-- inject:scripts -->
        </script>
      </body>
    </html>`;
}
