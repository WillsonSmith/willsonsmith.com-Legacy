import { LitElement, svg, css } from "lit";

class StarSheet extends LitElement {
  static get properties() {
    return {
      stars: { type: Array },
      starDensity: { type: Number, attribute: `star-density` },
    };
  }
  static get styles() {
    return css`
      :host {
        --star-color: #fff;
      }
      svg {
        width: 100%;
        height: 100%;
      }
      circle {
        fill: var(--star-color);
      }
    `;
  }

  constructor() {
    super();
    this.seed = Date.now();
    this.stars = [];
    this.starDensity = 20;
  }

  firstUpdated() {
    this.resizeObserver = new ResizeObserver(() => this._generateStars());
    this.resizeObserver.observe(this);
    this._generateStars();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }

  render() {
    return svg`<svg>
      ${this.stars.map((star) => {
        return svg`<circle cx="${star.x}" cy="${star.y}" r="${star.radius}"></circle>`;
      })}
    </svg>`;
  }

  _generateStars() {
    const rng = seededPseudoRandom(this.seed);
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    const starCount = (width / 100) * this.starDensity;

    this.stars = Array.from({ length: starCount }, () => {
      const x = rng.next().value * width;
      const y = rng.next().value * height;
      const radius = rng.next().value * 3;
      return { x, y, radius };
    });
  }
}
customElements.define(`star-sheet`, StarSheet);

function* seededPseudoRandom(initial) {
  let seed = initial % 2147483647;
  if (seed <= 0) seed += 2147483646;

  while (true) {
    seed = (seed * 16807) % 2147483647;
    yield (seed - 1) / 2147483647;
  }
}
