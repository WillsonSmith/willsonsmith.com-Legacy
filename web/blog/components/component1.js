import {LitElement, html, css} from 'lit';

class ComponentOne extends LitElement {
  static get styles() {
    return css`
      :host {
      }
    `;
  }

  render() {
    return html`
      <div>
        <h2>Hello</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define(`component-one`, ComponentOne);