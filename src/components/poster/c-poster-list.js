import { LitElement, html, css, render } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export const HANDLE = `c-poster-list`;
class PosterList extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
        --container-padding: 0;
        --edge-mask: linear-gradient(
          to right,
          hsl(0 0% 0% / 0),
          hsl(0 0% 0% / 1) 10%,
          hsl(0 0% 0% / 1) 90%,
          hsl(0 0% 0% / 0)
        );
      }
      .scroll-container {
        display: flex;
        gap: var(--c-spacing-m);
        overflow-x: hidden;
        -webkit-mask-image: var(--edge-mask);
        mask-image: var(--edge-mask);
        padding: var(--container-padding);
        width: 100%;
      }

      .poster-list {
        display: flex;
        flex-shrink: 0;
        gap: var(--c-spacing-m);
      }

      ::slotted(c-poster) {
        flex: 1 0 150px;
        border-radius: 9px;
        overflow: hidden;
        width: 150px;
      }
    `,
  ];

  static properties = {
    items: { type: Array },
  };

  firstUpdated() {
    const items = Array.from(this.querySelectorAll('c-poster'));
    this.items = items;
    const clones = items.map((item) => item.cloneNode(true));
    for (const clone of clones) {
      clone.setAttribute('slot', 'poster-list-2');
    }
    const markup = html` ${items} ${clones} `;
    render(markup, this);

    const animations = [
      { transform: 'translate3d(0, 0, 0)' },
      { transform: 'translate3d(calc(-100% - var(--c-spacing-m)), 0, 0)' },
    ];
    const animationTiming = {
      duration: 10000 * items.length, // 1 second per item
      iterations: Infinity,
    };
    const posterLists = Array.from(
      this.shadowRoot.querySelectorAll('.poster-list')
    );
    for (const posterList of posterLists) {
      posterList.animate(animations, animationTiming);
    }
  }

  render() {
    return html`
      <div
        class="scroll-container"
        style=${styleMap({
          maxWidth: `calc(${this.items?.length} * (var(--c-spacing-m) + 150px))`,
        })}
      >
        <div class="poster-list">
          <slot></slot>
        </div>
        <div class="poster-list" aria-hidden="true">
          <slot name="poster-list-2"></slot>
        </div>
      </div>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, PosterList);
}
