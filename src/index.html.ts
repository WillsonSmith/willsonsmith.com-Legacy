import { html } from 'lit';

export const title = 'willsonsmith.com';
export const links = [{ rel: 'stylesheet', href: '/css/pages/index.css' }];
export const meta = [
  { name: 'description', content: 'Willson Smith is a software engineer and writer.' },
];

export { default as styles } from './css/pages/index.css.js';

import './components/layout/main-page.js';
export default () =>
  html`
    <main-page>
      <h1>Willson Smith</h1>
      <p>Software Engineer and Writer</p>
    </main-page>
  `;
