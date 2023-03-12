import { html, css } from 'lit';

import './components/counter.js';
import '../components/layout/two-column.js';

type Data = {
  [key: string]: unknown;
  collections: {
    published?: any[];
  };
};

export const styles = css`
  :root,
  :host {
    --reading-column-width: 60ch;
    --aside-column-width: 20ch;
  }
  .blog-page {
    max-width: calc(var(--reading-column-width) + var(--aside-column-width));
    margin: 0 auto;
  }
`;

export default (data: Data) => {
  return html`
    <div class="blog-page">
      <h1>Blog</h1>
      <two-column>
        <main>This is my blog :)</main>
        <aside slot="secondary">
          ${data.collections.published?.map((item: any) => {
            return html`<a href="${item.url}">${item.data.title}</a>`;
          })}
        </aside>
      </two-column>
    </div>
  `;
};

// export const hydratedComponents = ['../components/layout/two-column.js'];
