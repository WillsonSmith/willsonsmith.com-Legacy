import { LitElement, html, css, render } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
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

      .film-strip-mask {
        position: relative;
      }

      .film-strip-mask::before {
        content: '';
        background: var(--theme-color-black);
        -webkit-mask-image: url(/img/film-strip-mask.svg);
        mask-image: url(/img/film-strip-mask.svg);
        -webkit-mask-size: cover;
        mask-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
    film: { type: Boolean },
  };

  render() {
    return html`
      <a href=${this.url} title=${this.alt}>
        <picture
          class=${classMap({
            'film-strip-mask': this.film,
          })}
        >
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
