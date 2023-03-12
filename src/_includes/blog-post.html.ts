import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type Data = {
  [key: string]: unknown;
  title: string;
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
export default (data: Data) => html`
  <main-page>
    <two-column>
      <main>${unsafeHTML(data.content as string)}</main>
      <aside slot="secondary">
        <h2>Recent Posts</h2>
        <ul role="list" class="recent-posts">
          ${data.collections.published?.map((item: any) => {
            return html`<li><a href="${item.url}">${item.data.title}</a></li>`;
          })}
        </ul>
      </aside>
    </two-column>
  </main-page>
`;
