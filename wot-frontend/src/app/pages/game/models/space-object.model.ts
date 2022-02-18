import { Projectile } from "./projectile.model";
import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";
import {Explosion} from "./explosion.model";

export class SpaceObject extends GameObject {
    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public detected: boolean;
    public projectile: Projectile;
    public prediciton: number;

    private velocityX: number;
    private velocityY: number;

    public imagePath: string;
    private image: HTMLImageElement;

    public predConfidence: string;
    public predClass: string;

    public type: number = 0; //0: shoot, 1: collect, 2: fly by

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

        if (this.detected){
            ctx.beginPath();
            ctx.rect(this.x-0.5*this.width, this.y-0.5*this.height, this.width, this.height);
            ctx.strokeStyle = (this.type === 0) ? "red" : "#00FF00";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.font = "20px Consolas";
            ctx.fillStyle = (this.type === 0) ? "red" : "#00FF00";
            const msg = this.predClass + " " + this.predConfidence;
            ctx.fillText(msg, this.x-0.5*this.width, (this.y-0.5*this.height)-5);
            ctx.stroke();
        }

        if (this.projectile) {
            this.projectile.draw(ctx);
        }
    }

    public update(delta: number): void {
        this.x = this.x + this.velocityX + this.velocityX * delta * 0.03;
        this.y = this.y + this.velocityY + this.velocityY * delta * 0.03;

        const dist = Math.hypot(this.game.getTruck().x - this.x, this.game.getTruck().y - this.y);
        if (this.projectile){
            this.projectile.update(delta);
            if (this.hitProjectile()) {
                this.game.spawnObject(new Explosion(this.game, this.x, this.y));
                this.active = false;
            }
        } else if (dist > 400) {
            this.detected = false;
        } else if (dist < 400 && !this.detected){
            this.detected = true;
            if (this.type === 0){
                const angle = Math.atan2(this.y - this.game.getTruck().y, this.x - this.game.getTruck().x);

                const vx = Math.cos(angle) * 6;
                const vy = Math.sin(angle) * 6;
                this.projectile = new Projectile(this.game, this.game.getTruck().x, this.game.getTruck().y, vx, vy);
            }
        }

        if (this.hitTruck()) {
            this.active = false;
        }
    }

    public hitTruck(): boolean {
        const dist = Math.hypot(this.x - this.game.getTruck().x, this.y - this.game.getTruck().y);
        return (dist < this.game.getTruck().height/2 && this.type != 2);
    }

    public hitProjectile(): boolean {
        const dist = Math.hypot(this.x - this.projectile.x, this.y - this.projectile.y);
        return dist < 70;
    }
}
