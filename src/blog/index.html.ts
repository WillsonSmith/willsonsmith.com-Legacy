import { html } from 'lit';

import './components/counter.js';
import '../components/layout/two-column.js';

type Data = {
  [key: string]: unknown;
  collections: {
    published?: any[];
  };
};

export const links = [{ rel: 'stylesheet', href: '/css/pages/blog.css' }];

import '../components/layout/main-page.js';

export default (data: Data) => {
  return html`
    <main-page>
      <two-column>
        <main>This is my blog :)</main>
        <aside slot="secondary">
          ${data.collections.published?.map((item: any) => {
            return html`<a href="${item.url}">${item.data.title}</a>`;
          })}
        </aside>
      </two-column>
    </main-page>
  `;
};
