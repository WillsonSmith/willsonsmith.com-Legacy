import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import headingsCss from '../../css/literals/resets/headings.css';

@customElement('main-nav')
export class MainNav extends LitElement {
  render() {
    return html`
      <header class="main-nav">
        <div><slot name="title"></slot></div>
        <nav>
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
        </nav>
      </header>
    `;
  }

  static styles = [
    css`
      ${headingsCss}
      :host {
        font-family: inherit;
      }

      .main-nav {
        display: flex;
        gap: 1rem;

        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid grey;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'main-nav': MainNav;
  }
}
