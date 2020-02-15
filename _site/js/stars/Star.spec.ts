import 'mocha';
import assert = require('assert');

import Star from './Star';

describe('Star', () => {
  describe('constructor', () => {
    it('should set opacity to given opacity', () => {
      const newStar = new Star(0.5, 0.5);
      assert.equal(0.5, newStar.opacity);
    });
    it('should have a radius of 8 times the radius multiplier given', () => {
      const newStar = new Star(0, 0.5);
      assert.equal(4, newStar.radius);
    })
  });
});
