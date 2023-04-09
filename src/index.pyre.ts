import { css, html } from 'lit';

export const links = [
  {
    rel: 'stylesheet',
    href: '/css/reset.css',
  },
];

export const styles = css`
  site-header {
    display: block;
    padding-inline: var(--spacing-lg);
    padding-block: var(--spacing);
    background: var(--sl-color-orange-200);
  }
`;

import 'components/site-header.js';
export default async () => {
  return html`
    <site-header></site-header>
    <main>
      <h1>Hello World</h1>
    </main>
  `;
};
