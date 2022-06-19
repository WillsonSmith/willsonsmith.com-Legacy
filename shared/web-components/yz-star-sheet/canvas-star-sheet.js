import { LitElement, html, svg, css } from "lit";

class StarSheet extends LitElement {
  static get properties() {
    return {
      stars: { type: Array },
      starCount: { type: Number },
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
        return svg`<circle cx="${star.x}" cy="${star.y}" r="${star.radius}" fill="var(--star-color)"></circle>`;
      })}
    </svg>`;
  }

  _generateStars() {
    const rng = seededPseudoRandom(this.seed);
    this.starCount = (this.offsetWidth / 100) * this.starDensity;
    let stars = [];
    for (let i = 0; i < this.starCount; i++) {
      stars.push({
        x: rng.next() * this.offsetWidth,
        y: rng.next() * this.offsetHeight,
        radius: rng.next() * 4,
      });
    }
    this.stars = stars;
  }
}
customElements.define(`star-sheet`, StarSheet);

function seededPseudoRandom(initSeed) {
  let seed = initSeed % 2147483647;
  if (seed <= 0) seed += 2147483646;

  function next() {
    return (seed = (seed * 16807) % 2147483647);
  }

  return {
    next() {
      return (next() - 1) / 2147483646;
    },
  };
}
