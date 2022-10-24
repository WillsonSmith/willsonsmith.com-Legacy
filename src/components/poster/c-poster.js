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
      }
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    `,
  ];

  sources = [];
  static properties = {
    name: { type: String },
    src: { type: String },
    alt: { type: String },
    url: { type: String },
    sources: { type: Array },
  };

  render() {
    return html`
      <a href=${this.url} title=${this.alt}>
        <picture>
          ${this.sources.map((source) => {
            return html`<source
              srcset=${source.srcset}
              media=${source.media}
            />`;
          })}
          <img src=${this.src} alt=${this.alt} />
        </picture>
      </a>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, Poster);
}
