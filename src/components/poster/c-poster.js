import { LitElement, html, css, render } from 'lit';

export const HANDLE = `c-poster`;
class Poster extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      a {
        display: block;
        border-radius: 9px;
        overflow: hidden;
      }
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    `,
  ];

  static properties = {
    name: { type: String },
    src: { type: String },
    alt: { type: String },
    url: { type: String },
  };

  firstUpdated() {
    const sources = Array.from(this.querySelectorAll('source'));
    const pictureElement = html`
      <picture>
        ${sources}
        <img src="${this.src}" alt="${this.alt}" />
      </picture>
    `;
    render(pictureElement, this.shadowRoot.querySelector('a'));
  }

  render() {
    return html` <a href=${this.url} title=${this.alt}></a> `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, Poster);
}
