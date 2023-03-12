import { html } from 'lit';
import type { GlobalData } from '../../types/GlobalData.js';

import '../components/layout/two-column.js';
import './components/post-list.js';

export const links = [{ rel: 'stylesheet', href: '/css/pages/blog.css' }];

import '../components/layout/main-page.js';
export default (data: GlobalData) => {
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
