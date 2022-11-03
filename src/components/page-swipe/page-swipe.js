import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export const HANDLE = `page-swipe`;
class PageSwipe extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        --indicator-item-border: none;
        --indicator-item-active-border: none;
        --indicator-space-between: var(--c-spacing-sm);
        --indicator-space-below: var(--c-spacing-m);
        --indicator-item-size: var(--c-spacing-sm);
        --indicator-color: var(--theme-color-white);
        display: block;
      }
      .container {
        display: flex;
        position: relative;
        scroll-snap-type: x mandatory;
        scrollbar-width: 0;
        overflow-x: auto;
        height: 100%;
      }
      .container::-webkit-scrollbar {
        display: none;
      }
      .page-indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: var(--indicator-space-below);
      }
      .page-indicator-item {
        --opacity: 0.5;
        background: var(--indicator-color);
        border: var(--indicator-item-border);
        border-radius: 50%;
        backdrop-filter: blur(10px);
        opacity: var(--opacity);
        width: var(--indicator-item-size);
        height: var(--indicator-item-size);
        margin-left: var(--indicator-space-between);
      }
      .page-indicator-item-active {
        --opacity: 1;
        border: var(--indicator-item-active-border);
      }
      ::slotted(swipable-page) {
        width: 100%;
        flex-shrink: 0;
        scroll-snap-align: start;
      }
    `,
  ];

  static properties = {
    pages: { type: Number, attribute: false },
    activePage: { type: Number, attribute: 'active-page' },
    indicator: { type: Boolean },
  };
  constructor() {
    super();
    this.pages = 0;
    this.activePage = 0;
    this.indicator = false;
  }

  firstUpdated() {
    this.pages = this.querySelectorAll(`swipable-page`).length;
    console.log(this.pages);
  }

  render() {
    return html`
      <div class="container" @scroll=${this._handleScroll}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
      ${this.indicator && this.pages > 1
        ? html`<div class="page-indicator">
            ${Array.from({ length: this.pages }, (_, i) => {
              return html`
                <div
                  class=${classMap({
                    'page-indicator-item': true,
                    'page-indicator-item-active': i === this.activePage,
                  })}
                ></div>
              `;
            })}
          </div>`
        : ``}
    `;
  }

  _handleScroll(event) {
    const scrollLeft = event.target.scrollLeft;
    const pageWidth = this.offsetWidth;

    const visiblePageWidth = pageWidth * 0.3;
    const visiblePageLeft = scrollLeft + visiblePageWidth;
    const page = Math.floor(visiblePageLeft / pageWidth);

    if (page !== this.activePage) {
      this.activePage = page;
      this.dispatchEvent(
        new CustomEvent(`page-changed`, {
          detail: { page },
        })
      );
    }
  }

  _handleSlotChange(event) {
    this.pages = this.querySelectorAll(`swipable-page`).length;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, PageSwipe);
}
