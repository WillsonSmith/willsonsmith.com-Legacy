import { LitElement, html, css, render } from 'lit';

export const HANDLE = `c-poster-list`;
class PosterList extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
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
        width: 100%;
        overflow-x: hidden;
        padding: var(--container-padding);
        -webkit-mask-image: var(--edge-mask);
        mask-image: var(--edge-mask);
      }

      .poster-list {
        display: flex;
        flex-shrink: 0;
        gap: var(--c-spacing-m);
      }

      c-poster,
      ::slotted(c-poster) {
        flex: 1 0 150px;
        width: 150px;
        overflow: hidden;
        border-radius: 9px;
      }
    `,
  ];

  static properties = {
    center: { type: Boolean },
  };

  firstUpdated() {
    const items = Array.from(this.querySelectorAll('c-poster'));
    const clones = items.map((item) => item.cloneNode(true));
    for (const clone of clones) {
      clone.setAttribute('slot', 'poster-list-2');
    }
    const markup = html`
      ${items.map((item) => item)} ${clones.map((item) => item)}
    `;
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
      <div class="scroll-container">
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
