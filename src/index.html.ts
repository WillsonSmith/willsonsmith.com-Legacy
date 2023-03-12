import { html } from 'lit';

export const title = 'willsonsmith.com';
export const links = [{ rel: 'stylesheet', href: '/css/pages/index.css' }];
export const meta = [
  { name: 'description', content: 'Willson Smith is a software engineer and writer.' },
];

export { default as styles } from './css/pages/index.css.js';

export default () =>
  html` <h1>Willson Smith</h1>
    <a href="/blog">Blog</a>`;
