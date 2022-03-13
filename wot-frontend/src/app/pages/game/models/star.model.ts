import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";

export class Star extends GameObject {

  private x: number;
  private y: number;
  private z: number;

  constructor(game: GameComponent) {
    super(game);
    do {
      this.initLoc(false);
    } while (this.isOutOfBounds())
  }

  private initLoc(fromBehind: boolean): void {
    this.x = Math.random()*1600-800;
    this.y = Math.random()*900-450;
    this.z = fromBehind ? 0 : Math.random()*1000;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const x = this.get2DX();
    const y = this.get2DY();
    const d = (this.z / 1000.0)
    const intensity = (1-d*d)

    ctx.fillStyle = "hsla(0,0%,100%,"+intensity+")";
    ctx.fillRect(x, y, 2, 2);
  }

  public update(delta: number): void {
    this.z -= delta * 0.02;
    while (this.z <= 1){
      this.z += 1000;
    }

    if (this.isOutOfBounds()) {
      this.initLoc(true);
    }
  }

  private get2DX(): number {
    return this.game.centerX + this.x / (this.z * 0.001);
  }

  private get2DY(): number {
    return this.game.centerY + this.y / (this.z * 0.001);
  }

  private isOutOfBounds(): boolean {
    const x = this.get2DX();
    const y = this.get2DY();

    return x < 0 || x >= this.game.width || y < 0 || y >= this.game.height;
  }
}
