import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { spacing } from "../_system/tokens/spacing";

class Swipable extends LitElement {
  static properties = {
    pages: { type: Number },
    activePage: { type: Number },
    indicator: { type: Boolean },
  };

  static styles = [
    spacing,
    css`
      :host {
        --indicator-space-between: var(--yz-spacing-01);
        --indicator-space-below: var(--yz-spacing-01);
        --indicator-item-size: var(--yz-spacing-02);
        --indicator-color: rgba(125, 125, 125, 1);
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

        position: fixed;
        left: 0;
        right: 0;
        bottom: var(--indicator-space-below);
      }

      .page-indicator-item {
        --opacity: 0.5;
        background: var(--indicator-color);
        border-radius: 50%;
        backdrop-filter: blur(10px);
        opacity: var(--opacity);
        width: 8px;
        height: 8px;
        margin-left: var(--indicator-space-between);
      }
      .page-indicator-item-active {
        --opacity: 1;
      }

      ::slotted(yz-swipable-page) {
        width: 100%;
        flex-shrink: 0;
        scroll-snap-align: start;
      }
    `,
  ];

  constructor() {
    super();
    this.pages = 0;
    this.activePage = 0;
  }

  render() {
    return html`
      <div class="container" @scroll=${this.handleScroll}>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.indicator && this.pages > 1
          ? html`<div class="page-indicator">
          ${Array.from({ length: this.pages }, (_, i) => {
            return html`
              <div
                class=${classMap({
                  "page-indicator-item": true,
                  "page-indicator-item-active": i === this.activePage,
                })}
              ></div>
            `;
          })}
        </div>
      </div>`
          : ``}
      </div>
    `;
  }

  handleScroll(event) {
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

  handleSlotChange() {
    this.pages = this.querySelectorAll(`yz-swipable-page`).length;
  }
}

customElements.define(`yz-swipable`, Swipable);
import(`./components/yz-swipable-page.js`);
