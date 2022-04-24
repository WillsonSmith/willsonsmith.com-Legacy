import { html, css, LitElement } from 'lit';

let demoEvents = ['click', 'hover', 'scroll', 'touchstart'];

class SpatialPop extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  static get properties() {
    return {
      events: { type: Array, attribute: 'events' },
      playing: { type: Boolean, attribute: 'playing' },
    };
  }
  constructor() {
    super();
    this.events = [];
    this.playing = false;
    this._handleEvent = this._handleEvent.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    console.log(this.events);
    if (changedProperties.has('events')) {
      const previousEvents = changedProperties.get('events') || [];
      const removedEvents = previousEvents.filter(
        (event) => !this.events.includes(event)
      );

      for (const event of removedEvents) {
        this.removeEventListener(event, this._handleEvent);
      }

      const newEvents = this.events.filter(
        (event) => !previousEvents.includes(event)
      );
      for (const event of newEvents) {
        this.addEventListener(event, this._handleEvent);
      }
    }
  }

  render() {
    return html` <slot></slot>`;
  }

  _handleEvent(event) {
    const { target } = event;
    if (!this.contains(target)) return;

    const x = (target.offsetLeft + target.offsetWidth / 2) / this.offsetWidth;
    const y = (target.offsetTop + target.offsetHeight / 2) / this.offsetHeight;
    console.log(x, y);
  }
}

customElements.define('spatial-pop', SpatialPop);
