import { html, css } from 'lit';

import './components/counter.js';
import '../components/layout/two-column.js';
import './components/post-list.js';

import type { Post } from '../../types/collections/Post.js';

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
          <post-list .posts=${posts}></post-list>
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
