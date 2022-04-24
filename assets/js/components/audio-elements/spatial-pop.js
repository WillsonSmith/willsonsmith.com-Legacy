import { Howl, Howler } from 'howler';
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
      src: { type: String, attribute: 'src' },
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
    const sources = this.querySelectorAll('pop-source');
    for (const source of sources) {
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('src')) {
      console.log('src changed');
      console.log(this.src);
      this.playing = false;
      this.audio = new Howl({
        src: this.src,
        sprite: {
          pop: [500, 1000],
        },
        onplay: () => {
          this.playing = true;
        },
        onend: () => {
          this.playing = false;
        },
      });
    }

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
    return html`<slot></slot>`;
  }

  _handleEvent(event) {
    const { target } = event;
    if (!this.contains(target)) return;

    // get the relative position of the centre of the target to the centre of the container
    // get number between -1 and 1 for each axis
    const x =
      (target.offsetLeft + target.offsetWidth / 2) / this.offsetWidth - 1;
    const y =
      (target.offsetTop + target.offsetHeight / 2) / this.offsetHeight - 1;
    console.log(x, y);

    this.audio.orientation(x, y, 0);
    this.audio?.play('pop');
  }
}

customElements.define('spatial-pop', SpatialPop);
