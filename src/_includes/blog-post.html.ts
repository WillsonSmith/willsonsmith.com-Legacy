import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { Post } from '../../types/collections/Post.js';

type Data = {
  [key: string]: unknown;
  title: string;
  page: {
    url: string;
  };
  collections: {
    published?: Post[];
  };
};

import '../components/layout/main-page.js';
import '../components/layout/two-column.js';

export const styles = css`
  .recent-posts {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

export const links = [{ rel: 'stylesheet', href: '/css/pages/blog-post.css' }];
export default (data: Data) => {
  const publishedList = recentlyPublished(data.collections.published);
  const pageUrl = data.page.url;
  return html`
    <main-page>
      <two-column>
        <main>${unsafeHTML(data.content as string)}</main>
        <aside slot="secondary">
          <h2>More posts</h2>
          <ul role="list" class="recent-posts">
            ${publishedList
              .filter((post) => pageUrl !== post.url)
              .map((post) => {
                return html`<li><a href="${post.url}">${post.data.title}</a></li>`;
              })}
          </ul>
        </aside>
      </two-column>
    </main-page>
  `;
};

function recentlyPublished(posts: Post[] = []) {
  const published = posts.filter((item) => item.data.published);
  const sorted = published.sort((a, b) => {
    if (!a.data.published || !b.data.published) return 0;
    return new Date(b.data.published).getTime() - new Date(a.data.published).getTime();
  });
  return sorted.slice(0, 5);
}
