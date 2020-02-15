import Prng from '../helpers/prng';
import Star from './Star';

interface CanvasStar {
  star: Star,
  properties: Array<number>,
}

export interface ConstructorArgs {
  canvas:HTMLCanvasElement,
  numberOfStars:number,
  startSeed:number,
  width:number,
  height:number,
  ratio
}

class StarSheet {
  context: any;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  seed: number;
  seededRng: Prng;

  constructor({ canvas, numberOfStars, startSeed, width, height, ratio }:ConstructorArgs) {
    this.seed = startSeed;
    this.seededRng = new Prng(this.seed);
    const pixelRatio = ratio || 1;
    this.canvas = canvas;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this.context = canvas.getContext('2d');
    this.context.scale(pixelRatio, pixelRatio);
    this.drawStars(numberOfStars);
  }

  private createStar():CanvasStar {
    const star:Star = new Star(this.seededRng.nextFloat(), this.seededRng.nextFloat());
    return {
      star,
      properties: [
        star.radius + (this.seededRng.nextFloat() * this.width),
        star.radius + (this.seededRng.nextFloat() * this.height),
        star.radius * this.seededRng.nextFloat(),
        0,
        Math.PI*2
      ],
    }
  }

  private drawStars(number:number) {
    for (let star:number = 0; star < number; star++) {
      const starData = this.createStar();
      const context = this.context;
      context.beginPath();
      context.arc.apply(context, [...starData.properties, false]);
      context.fillStyle = `rgba(255, 255, 255, ${starData.star.opacity})`;
      context.fill();
    }
  }
}

export default StarSheet;
