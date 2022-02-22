import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";

export class Truck extends GameObject {
    public x: number;
    public y: number;

    public width: number;
    public height: number;

    private velocityX: number;
    private velocityY: number;

    public imagePath: string;
    private readonly image: HTMLImageElement;

    constructor(game: GameComponent, x: number, y: number, velocityX: number, velocityY: number, imgPath: string, width: number, height: number){
        super(game);

        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.image = new Image();
        this.image.src = imgPath;
        this.imagePath = imgPath;
        this.width = width;
        this.height = height;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, (this.x-this.width/2), (this.y-this.height/2), this.width, this.height);
    }

    public update(delta: number): void {
        // do nothing
    }
}
