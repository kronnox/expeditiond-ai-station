import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";
import {GameConfig} from "../game-config";

export class Nebula extends GameObject {

    private x: number;
    private y: number;
    private opacity: number;
    private p: number;
    private image: HTMLImageElement;

    constructor(game: GameComponent, p: number) {
        super(game);

        this.x = (Math.random()*500)>>0;
        this.y = (Math.random()*500)>>0;

        this.p = p;

        this.image = new Image();
        this.image.src = 'assets/game/nebula_cloud.png';
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image, this.y+this.p, this.y+this.p, 500-(this.p*2),500-(this.p*2), -GameConfig.shakeFactor,-GameConfig.shakeFactor, this.game.width + GameConfig.shakeFactor, this.game.height + GameConfig.shakeFactor);
        ctx.globalAlpha = 1;
    }

    update(delta: number): void {
        this.p = this.p + 0.005 * delta;
        this.opacity = Math.sin(this.p * 0.05) * 0.4;
        if (this.opacity < 0) {
            this.p = this.opacity = 0;
            this.y = (Math.random()*500)>>0;
            this.x = (Math.random()*500)>>0;
        }
    }
}
