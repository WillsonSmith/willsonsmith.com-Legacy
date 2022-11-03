import { LitElement, html, css, render } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
export const HANDLE = `infinite-carousel`;
class InfiniteCarousel extends LitElement {
  static styles = [
    css`
      :host {
        --container-padding: 0;
        display: flex;
      }

      .scroller {
        padding: var(--container-padding);
        display: flex;
        gap: var(--c-spacing-m);
        overflow-x: hidden;
        width: 100%;
      }

      .item-list {
        display: flex;
        flex-shrink: 0;
        gap: var(--c-spacing-m);
      }

      ::slotted(infinite-carousel-item) {
        flex: 1 0 var(--item-width);
        width: var(--item-width);
      }
    `,
  ];

  static properties = {
    items: { type: Array },
    itemWidth: { type: Number },
    direction: { type: String },
    duration: { type: Number },
  };
  constructor() {
    super();
    this.itemWidth = 150;
    this.duration = 1;
  }
  firstUpdated() {
    const items = Array.from(this.querySelectorAll('infinite-carousel-item'));
    this.items = items;
    const clones = items.map((item) => item.cloneNode(true));
    for (const clone of clones) {
      clone.setAttribute('slot', 'item-list-2');
    }
    const markup = html` ${items} ${clones} `;
    render(markup, this);

    let animations = [];
    if (this.direction === 'left') {
      animations = [
        { transform: 'translate3d(0, 0, 0)' },
        { transform: 'translate3d(calc(-100% - var(--c-spacing-m)), 0, 0)' },
      ];
    } else {
      animations = [
        { transform: 'translate3d(calc(-100% - var(--c-spacing-m)), 0, 0)' },
        { transform: 'translate3d(0, 0, 0)' },
      ];
    }
    const animationTiming = {
      duration: this.duration * 10000 * items.length, // 1 second per item
      iterations: Infinity,
    };
    const itemLists = Array.from(
      this.shadowRoot.querySelectorAll('.item-list')
    );
    for (const itemList of itemLists) {
      itemList.animate(animations, animationTiming);
    }
  }

  render() {
    return html`
      <div
        class="scroller"
        style=${styleMap({
          maxWidth: `calc(${this.items?.length} * (var(--c-spacing-m) + ${this.itemWidth}px))`,
          '--item-width': `${this.itemWidth}px`,
        })}
      >
        <div class="item-list">
          <slot></slot>
        </div>
        <div class="item-list" aria-hidden="true">
          <slot name="item-list-2"></slot>
        </div>
      </div>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, InfiniteCarousel);
}
