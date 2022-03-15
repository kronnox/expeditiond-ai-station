import { Projectile } from "./projectile.model";
import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";
import {Explosion} from "./explosion.model";
import {GameConfig} from "../game-config";
import { ImageObject } from "src/app/model/image/image-object";

export class SpaceObject extends GameObject {
    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public detected: boolean;
    public projectile: Projectile;

    private velocityX: number;
    private velocityY: number;
    private angle: number;

    private image: HTMLImageElement;

    public imageObject: ImageObject;

    public action: number = 0; //0: shoot, 1: collect, 2: fly by

    constructor(game: GameComponent, x: number, y: number, velocityX: number, velocityY: number, imgO: ImageObject, width: number, height: number){
        super(game);

        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.angle = Math.atan2(this.y - this.game.truck.y, this.x - this.game.truck.x);
        this.image = new Image();
        this.image.src = imgO.imagePath;
        this.imageObject = imgO;
        this.width = width;
        this.height = height;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, (this.x-this.width/2), (this.y-this.height/2), this.width, this.height);

        if (this.detected){
            ctx.beginPath();
            ctx.rect(this.x-0.5*this.width, this.y-0.5*this.height, this.width, this.height);
            ctx.strokeStyle = (this.action === 0) ? "#e63946" : "#90be6d";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.font = "20px Consolas";
            ctx.fillStyle = (this.action === 0) ? "#e63946" : "#90be6d";
            const msg = this.imageObject.label || '';
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

        const range = GameConfig.radarRange + GameConfig.spaceObjectSize / 3;
        const dist = Math.hypot(this.game.truck.x - this.x, this.game.truck.y - this.y);
        if (this.projectile){
            this.projectile.update(delta);
            if (this.hitProjectile()) {
                this.checkDemage();
                this.game.spawnObject(new Explosion(this.game, this.x, this.y));
                this.active = false;
            }
        } else if (dist > range) {
            this.detected = false;
        } else if (
            dist < range
            && this.angle > this.game.radarAngle-0.1 && this.angle < this.game.radarAngle+0.1
            && !this.detected
        ){
            this.detected = true;
            if (this.action === 0){
                const vx = Math.cos(this.angle) * 6;
                const vy = Math.sin(this.angle) * 6;
                this.projectile = new Projectile(this.game, this.game.truck.x, this.game.truck.y, vx, vy);
            }
        }

        if (this.hitTruck()) {
            this.checkDemage();
        }
    }

    private checkDemage(): void {
        if(!this.imageObject.custom) {
            const demage = this.game.demage[this.imageObject.labeledClass][this.action];
            if(demage === 0) {
                if(this.action === 1) {
                    this.active = false;
                }
            } else {
                this.active = false;
                this.game.truck.health -= demage;
                this.game.applyShake();
            }
        }
    }

    public hitTruck(): boolean {
        const dist = Math.hypot(this.x - this.game.truck.x, this.y - this.game.truck.y);
        return (dist < this.game.truck.height/2);
    }

    public hitProjectile(): boolean {
        const dist = Math.hypot(this.x - this.projectile.x, this.y - this.projectile.y);
        return dist < 70;
    }
}
