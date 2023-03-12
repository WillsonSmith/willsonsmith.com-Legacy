import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import headingsCss from '../../css/literals/resets/headings.css';

@customElement('main-nav')
export class MainNav extends LitElement {
  @property({ type: String }) title = 'Main Nav';
  render() {
    return html`
      <header>
        <h1>${this.title}</h1>
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'main-nav': MainNav;
  }
}
