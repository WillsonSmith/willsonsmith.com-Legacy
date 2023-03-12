import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type Data = {
  [key: string]: unknown;
  title: string;
  page: {
    url: string;
  };
  collections: {
    published?: any[];
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
              .map((item: any) => {
                return html`<li><a href="${item.url}">${item.data.title}</a></li>`;
              })}
          </ul>
        </aside>
      </two-column>
    </main-page>
  `;
};

function recentlyPublished(collection: any[] = []) {
  return collection
    .filter((item: any) => item.data.published)
    .sort((a: any, b: any) => {
      return new Date(b.data.published).getTime() - new Date(a.data.published).getTime();
    })
    .slice(0, 5);
}
