import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type Data = {
  [key: string]: unknown;
  title: string;
  collections: {
    published?: any[];
  };
};

import './components/main-nav.js';
import '../components/layout/two-column.js';

export const links = [{ rel: 'stylesheet', href: '/css/pages/blog-post.css' }];
export default (data: Data) => html`
  <main-nav title=${data.title}></main-nav>
  <two-column>
    <main>${unsafeHTML(data.content as string)}</main>
    <aside slot="secondary">
      <h2>Recent Posts</h2>
      <ul>
        ${data.collections.published?.map((item: any) => {
          return html`<li><a href="${item.url}">${item.data.title}</a></li>`;
        })}
      </ul>
    </aside>
  </two-column>
`;
