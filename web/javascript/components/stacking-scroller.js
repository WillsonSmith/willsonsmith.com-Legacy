import { LitElement, html, css } from "lit";

class StackingScroller extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .stackable {
        position: relative;
      }
    `;
  }

  static get properties() {
    return {
      offset: { type: Number },
      stackOffset: { type: Number, attribute: `stack-offset` },
    };
  }

  constructor() {
    super();
    this.offset = 0;
    this.stackOffset = 20;
  }

  render() {
    return html`
      <div class="stackable">
        <slot @slotchange=${this._slotChange}></slot>
      </div>
    `;
  }

  _slotChange() {
    const stackableElements = Array.from(this.children);
    stackableElements.forEach((element, index) => {
      element.style.position = `sticky`;
      element.style.top = `${this.offset + index * this.stackOffset}px`;
    });
  }
}

customElements.define(`stacking-scroller`, StackingScroller);
