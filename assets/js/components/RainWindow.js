import { html, css, LitElement } from 'lit';
import { debounce } from '../util/debounce';

class RainWindow extends LitElement {
  static get styles() {
    return css`
      :host {
        pointer-events: none;
      }
      .Canvas {
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
    };
  }

  constructor() {
    super();
    this.width = this.clientWidth * window.devicePixelRatio;
    this.height = this.clientHeight * window.devicePixelRatio;

    this.rain = Array.from({ length: 100 }, () => {
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.random() * -1 - 1,
        vy: Math.random() * 1 + 1,
        size: Math.random() * 10 + 2,
        length: Math.random() * 80 + 2,
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
    return html`<canvas
      width=${this.width}
      height=${this.height}
      class="Canvas"
    ></canvas>`;
  }

  _draw() {
    /**
     * This is extremely rudimentary right now
     * The plan:
     * - Set a raindrop as active
     * - If it's active, move it
     * - Move it X distance, reduce velocity, change direction to go down
     * - Simulate rain hitting a window
     * OR
     * - Make rain fall straight down
     * - When rain hits the bottom, make it split and bounce
     */

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.rainColor;
    // ctx.fillRect(0, 0, this.width, this.height);

    //advance each raindrop by its velocity
    this.rain.forEach((raindrop) => {
      raindrop.x += raindrop.vx;
      raindrop.y += raindrop.vy;
    });

    // if the raindrop has moved off the screen, reset it
    const offScreen = this.rain.filter((raindrop) => {
      if (raindrop.y > this.height && raindrop.x < 0) return true;
    });
    offScreen.forEach((raindrop) => {
      raindrop.x = Math.random() * this.width;
      raindrop.y = 0;

      // set x above top or set y to the right
    });

    // for each of the raindrops in the array draw line from position with velocity

    this.rain.forEach((raindrop) => {
      ctx.strokeStyle = this.rainColor;
      ctx.beginPath();
      ctx.moveTo(raindrop.x, raindrop.y);
      ctx.fillStyle = this.rainColor;
      ctx.fillRect(raindrop.x, raindrop.y, raindrop.size, raindrop.size);

      // draw a line from the raindrop along negative velocity of length
      // stroke width of size
      ctx.lineWidth = raindrop.size;
      ctx.lineTo(
        raindrop.x - raindrop.vx * raindrop.length,
        raindrop.y - raindrop.vy * raindrop.length
      );
      ctx.strokeStyle = this.rainColor;
      ctx.stroke();

      // draw the raindrop at the new position
    });
    requestAnimationFrame(() => this._draw());
  }

  _handleResize() {
    this.width = this.clientWidth;
    this.height = this.clientHeight;
  }
}

customElements.define('rain-window', RainWindow);
