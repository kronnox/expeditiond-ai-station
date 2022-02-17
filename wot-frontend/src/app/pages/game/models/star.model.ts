import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";

export class Star extends GameObject {

    private x: number;
    private y: number;
    private z: number;

    private brightness: number = 1;


    constructor(game: GameComponent, x: number, y: number, z: number) {
        super(game);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const x = this.get2DX();
        const y = this.get2DY();
        const d = (this.z / 1000.0)
        const intensity = (1-d*d) * 255

        ctx.fillStyle = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
        ctx.fillRect(x, y, 2, 2);
    }

    update(delta: number): void {
        this.z -= delta * 0.02;
        while (this.z <= 1){
            this.z += 1000;
        }

        const x = this.get2DX();
        const y = this.get2DY();

        if (x < 0 || x >= this.game.width || y < 0 || y >= this.game.height) {
            return;
        }
    }

    public get2DX(): number {
        return this.game.centerX + this.x / (this.z * 0.001);
    }

    public get2DY(): number {
        return this.game.centerY + this.y / (this.z * 0.001);
    }
}
