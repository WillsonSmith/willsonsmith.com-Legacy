import { html, css } from 'lit';

import './components/counter.js';
import '../components/layout/two-column.js';

type Post = {
  url: string;
  data: {
    title: string;
  };
};

type Data = {
  [key: string]: unknown;
  collections: {
    published?: Post[];
  };
};

export const links = [{ rel: 'stylesheet', href: '/css/pages/blog.css' }];

import '../components/layout/main-page.js';

export default (data: Data) => {
  const posts = data.collections.published || [];
  return html`
    <main-page>
      <two-column>
        <main>This is my blog :)</main>
        <aside slot="secondary">
          <nav class="blog-post-list">
            ${posts.map((post) => {
              return html`<a href="${post.url}">${post.data.title}</a>`;
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
