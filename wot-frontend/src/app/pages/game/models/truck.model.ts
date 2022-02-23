import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";
import {GameConfig} from "../game-config";

export class Truck extends GameObject {
    public x: number;
    public y: number;

    public width: number;
    public height: number;

    private readonly image: HTMLImageElement;

    constructor(game: GameComponent){
        super(game);

        this.x = this.game.centerX;
        this.y = this.game.centerY;

        this.image = new Image();
        this.image.src = 'assets/game/spacetruck.png';
        this.width = GameConfig.truckSize;
        this.height = GameConfig.truckSize / 2;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, (this.x-this.width/2), (this.y-this.height/2), this.width, this.height);
    }

    public update(delta: number): void {
        // do nothing
    }
}
