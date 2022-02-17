import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";

export class Projectile extends GameObject {
    public x: number;
    public y: number;

    public velocityX: number;
    public velocityY: number;

    private color: string = '#ff0000';
    private radius: number = 6;

    constructor(game: GameComponent, x: number, y: number, vx: number, vy: number){
        super(game);

        this.x = x;
        this.y = y;
        this.velocityX = vx;
        this.velocityY = vy;
    }

    public draw(ctx: CanvasRenderingContext2D): void{
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    public update(delta: number): void {
        this.x = this.x + this.velocityX;
        this.y = this.y + this.velocityY;
    }
}
