import {Node} from "./node.model";

export class Edge {

  private readonly fromX: number;
  private readonly fromY: number;
  private readonly toX: number;
  private readonly toY: number;

  private _weight: number;

  constructor(from: Node, to: Node) {
    this.fromX = from.x;
    this.fromY = from.y;
    this.toX = to.x;
    this.toY = to.y;
    this.weight = 5;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.weight;
    ctx.globalAlpha = this.weight/10;
    ctx.beginPath();
    ctx.moveTo(this.fromX, this.fromY);
    ctx.lineTo(this.toX, this.toY);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  public updateWeight(epoch: number): void {
    const factor = 1 - (epoch / 1000);
    this.weight += (Math.random()-0.5)*factor;
    if (this.weight > 10) this.weight = 10;
    if (this.weight < 1) this.weight = 1;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }
}
