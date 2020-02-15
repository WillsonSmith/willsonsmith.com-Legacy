class Star {
  opacity: number;
  radius: number;
  constructor(opacity:number, radiusMultiplier:number) {
    this.opacity = opacity;
    this.radius = Math.floor(radiusMultiplier * 7) + 1;
  }
}

export default Star;
