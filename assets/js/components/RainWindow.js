import { html, css, LitElement } from 'lit';
import { debounce } from '../util/debounce';

class RainWindow extends LitElement {
  static get styles() {
    return css`
      :host {
      }
      button {
        position: absolute;
      }
      .Canvas {
        pointer-events: none;
        width: 100%;
        height: 100%;
      }
    `;
  }

  static get properties() {
    return {
      rainColor: { type: String, attribute: 'rain-color' },
      width: { type: Number },
      height: { type: Number },
      playing: { type: Boolean, attribute: 'playing' },
    };
  }

  constructor() {
    super();
    this.playing = true;
    this.width = this.clientWidth * window.devicePixelRatio;
    this.height = this.clientHeight * window.devicePixelRatio;
    this.rainColor = `'#fff'`;

    this.splash = [];

    this.rain = Array.from({ length: 10 }, () => {
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height - this.height,
        size: Math.random() * 10 + 2,
        active: false,
      };
    });

    this._handleResize = debounce(this._handleResize.bind(this), 100);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleResize);
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this._draw();
  }

  updated(changedProperties) {
    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this._draw();
    }
  }

  render() {
    return html` <button @click=${() => (this.playing = !this.playing)}>
        Go
      </button>
      <canvas
        width=${this.width}
        height=${this.height}
        class="Canvas"
      ></canvas>`;
  }

  _draw(dt) {
    const delta = dt - (this.lastCalled || 0);
    if (delta < 13 || !this.playing) {
      return requestAnimationFrame((dt) => this._draw(dt));
    }

    this.lastCalled = dt;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.rainColor;

    const gravity = 9.8;

    const inactive = this.rain.filter(({ active }) => !active);
    const rando = inactive?.[Math.floor(Math.random() * inactive.length)];
    if (rando) rando.active = true;

    const remainingSplashes = this.splash.filter(({ tick }) => tick > 0);
    remainingSplashes.forEach((splash) => (splash.tick = splash.tick - 1));
    this.splash = remainingSplashes;
    this.splash.forEach((splash) => {
      ctx.fillStyle = this.rainColor;
      const s1Size = splash.size * Math.random();
      const s2Size = splash.size * Math.random();
      ctx.fillRect(
        splash.x - splash.size,
        this.height - splash.size - s1Size,
        s1Size,
        s1Size
      );
      ctx.fillRect(
        splash.x + splash.size,
        this.height - splash.size - s2Size,
        s2Size,
        s2Size
      );
    });

    const active = this.rain.filter(({ active }) => active);

    active.forEach((drop) => {
      drop.y += gravity;
      if (drop.y > this.height) {
        this.splash.push({
          x: drop.x,
          y: this.height,
          size: drop.size,
          tick: 3,
        });
        drop.x = Math.random() * this.width;
        drop.y = 0;
        drop.active = false;
      }
    });

    this.rain.forEach((raindrop) => {
      ctx.fillStyle = this.rainColor;
      ctx.fillRect(raindrop.x, raindrop.y, raindrop.size, raindrop.size);
    });

    requestAnimationFrame((dt) => this._draw(dt));
  }

  _handleResize() {
    this.width = this.clientWidth;
    this.height = this.clientHeight;
  }
}

customElements.define('rain-window', RainWindow);
