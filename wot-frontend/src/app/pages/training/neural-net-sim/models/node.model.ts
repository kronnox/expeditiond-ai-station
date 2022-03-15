export class Node {

  private readonly _x: number;
  private readonly _y: number

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#0e97aa';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#005C6B';
    ctx.stroke();
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
