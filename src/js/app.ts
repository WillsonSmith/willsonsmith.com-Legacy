import StarSheet from './stars/StarSheet';

const canvas = document.getElementById('stars');
const startSeed = Date.now();
const numberOfStars = (window.innerWidth / 100) * 20

const parameters = {
  canvas: canvas as HTMLCanvasElement,
  numberOfStars,
  startSeed,
  width: window.innerWidth as number,
  height: window.innerHeight as number,
  ratio: window.devicePixelRatio || 1,
}

let stars = new StarSheet(parameters);

window.addEventListener('resize', () => {
  window.requestAnimationFrame(() => {
    stars = new StarSheet(parameters);
  });
});
