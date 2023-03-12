import { html, css } from 'lit';

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
          <nav class="blog-post-list">
            ${data.collections.published?.map((item: any) => {
              return html`<a href="${item.url}">${item.data.title}</a>`;
            })}
          </nav>
        </aside>
      </two-column>
    </main-page>
  `;
};

export const styles = css`
  .blog-post-list {
    display: grid;
    gap: 0.6rem;
  }
`;
