import StarSheet from './stars/StarSheet';

// interface fontFaceOptions {
//     tolerance?: number;
//     delay?: number;
//     glyphs?: string;
//     success?: Function;
//     error?: Function;
//     timeout?: number;
//     weight?: string;
//     style?: string;
// }

// declare function FontFaceOnload(FontFamily:string, options:fontFaceOptions)
// FontFaceOnload('Toronto Subway', {
//   success: () => {
//     [].slice.call(document.querySelectorAll('.top-billing')).forEach((node) => node.classList.add('top-billing--fonts-loaded'));
//   },
//   error: function() {},
//   timeout: 5000 // in ms. Optional, default is 10 seconds
// });

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
    stars = new StarSheet({
      ...parameters,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
});
