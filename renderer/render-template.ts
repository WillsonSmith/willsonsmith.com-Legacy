import type { HTMLTemplateResult } from 'lit';

type Data = Record<string, unknown>;

import { render } from '@lit-labs/ssr';
export function* renderTemplate(template: (data: Data) => HTMLTemplateResult, data: Data) {
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
