import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-counter')
export class Counter extends LitElement {
  @property({ type: Number }) count = 0;
  render() {
    return html`<button @click=${this.add}>Clicked ${this.count} times</button>`;
  }

  private add() {
    this.count++;
  }

  static styles = [css``];
}

declare global {
  interface HTMLElementTagNameMap {
    'my-counter': Counter;
  }
}
