import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export const HANDLE = `c-poster-list`;
class PosterList extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .scroll-container {
        display: flex;
        gap: var(--c-spacing-m);
        overflow-x: hidden;
        max-width: 100%;
        -webkit-mask-image: linear-gradient(
          var(--mask-direction, to right),
          hsl(0 0% 0% / 0),
          hsl(0 0% 0% / 1) 20%,
          hsl(0 0% 0% / 1) 80%,
          hsl(0 0% 0% / 0)
        );
        mask-image: linear-gradient(
          var(--mask-direction, to right),
          hsl(0 0% 0% / 0),
          hsl(0 0% 0% / 1) 20%,
          hsl(0 0% 0% / 1) 80%,
          hsl(0 0% 0% / 0)
        );
      }

      .scroll-container:hover .poster-list {
        animation-play-state: paused;
      }
      .poster-list {
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        gap: var(--c-spacing-m);
        animation: scroll 40s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .poster-list {
          animation: none;
        }
      }

      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-100% - var(--c-spacing-m)));
        }
      }

      c-poster,
      ::slotted(c-poster) {
        flex: 1 0 150px;
        width: 150px;
        border-radius: 9px;
      }
    `,
  ];

  static properties = {
    center: { type: Boolean },
  };

  firstUpdated() {
    const items = Array.from(this.querySelectorAll('c-poster'));

    const fragment = document.createDocumentFragment();
    for (const item of items) {
      fragment.appendChild(item.cloneNode(true));
    }
    this.shadowRoot.querySelector('#second-list').appendChild(fragment);
  }

  render() {
    return html`
      <div class="scroll-container">
        <div class="poster-list">
          <slot></slot>
        </div>
        <div id="second-list" class="poster-list" aria-hidden="true"></div>
      </div>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, PosterList);
}
