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
  const { default: template, ...rest } = await import(modulePath);

  const composedData = {
    ...data,
    ...rest,
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

    <!-- inject:links -->

    <style>
      body[dsd-pending] {
        display: none;
      }
    </style>
  </head>
  <body dsd-pending>
    <script>
        if (HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
          document.body.removeAttribute('dsd-pending');
        }
    </script>
      <style>
        ${styles}
      </style>`;
  yield* render(template(data));
  yield `
    <script type="module">
      import { hsr } from "/js/hydrate.js";
      await hsr();
      <!-- inject:scripts -->
    </script>
  </body>
</html>`;
}
