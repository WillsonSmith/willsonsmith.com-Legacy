import 'mocha';
import * as sinon from 'sinon';
import * as assert from 'assert';

import StarSheet from './StarSheet';

describe('StarSheet', () => {
  let Stars = null;
  let fakeCanvas = null;

  beforeEach((done) => {
    function buildContextFunction() {
      const scale = sinon.spy();
      const beginPath = sinon.spy();
      const arc = sinon.spy();
      const fill = sinon.spy();

      return function() {
        return {
          fillStyle: '',
          scale,
          beginPath,
          arc,
          fill,
        }
      }
    };

    fakeCanvas = function() {
      return {
        get offsetWidth() { return parseInt(this.style.width, 10) },
        get offsetHeight() { return parseInt(this.style.height, 10) },
        style: {
          width: '300px',
          height: '150px',
        },
        getContext: buildContextFunction(),
      }
    }();

    Stars = new StarSheet({
      canvas: fakeCanvas as any,
      numberOfStars: 100,
      startSeed: 10,
      height: 500,
      width: 500,
      ratio: 2,
    });

    done();
  });

  describe('constructor', () => {
    it('assigns values on construction', () => {
      assert.equal(Stars.seed, 10);
      assert.equal(Stars.width, 500)
      assert.equal(Stars.height, 500)
    });

    it('scales the canvas for pixel ratio', () => {
      assert(Stars.context.scale.calledWith(2, 2));
    })

    it('draws the stars', () => {
     assert.equal(Stars.context.beginPath.callCount, 100)
     assert.equal(Stars.context.arc.callCount, 100)
     assert.equal(Stars.context.fill.callCount, 100)
    });
  });
});
