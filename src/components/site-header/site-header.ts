import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './nav-link.js';
@customElement('site-header')
export class SiteHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .site-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
    }

    h1 {
      margin: 0;
      line-height: var(--line-height-sm);
    }

    .social {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }
  `;

  render() {
    return html`
      <header class="site-header">
        <h1 part="heading">Willson</h1>
        <nav class="social">
          <nav-link href="https://github.com/willsonsmith" icon="github">Github</nav-link>
          <nav-link href="https://twitter.com/modfox" icon="twitter">Twitter</nav-link>
        </nav>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': SiteHeader;
  }
}
