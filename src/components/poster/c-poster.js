import { LitElement, html, css } from 'lit';

export const HANDLE = `c-poster`;
class Poster extends LitElement {
  static styles = [
    css`
      img {
        display: block;
        width: 100%;
      }
    `,
  ];

  static properties = {
    name: { type: String },
    src: { type: String },
    alt: { type: String },
    url: { type: String },
  };

  render() {
    return html`
      <a href=${this.url}><img src="${this.src}" alt="${this.alt}" /></a>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, Poster);
}
