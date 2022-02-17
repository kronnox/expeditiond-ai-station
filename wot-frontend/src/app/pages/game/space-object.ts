import { Projectile } from "./projectile";

export class SpaceObject {
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

    constructor(x: number, y: number, vx: number, vy: number, imgPath: string, width: number, height: number){
        this.x = x;
        this.y = y;
        this.velocityX = vx;
        this.velocityY = vy;
        this.image = new Image();
        this.image.src = imgPath;
        this.imagePath = imgPath;
        this.width = width;
        this.height = height;
    }

    draw(cx: CanvasRenderingContext2D): void{
        cx.drawImage(this.image, (this.x-this.width/2), (this.y-this.height/2), this.width, this.height);
        if(this.detected){
            cx.beginPath();
            cx.rect(this.x-0.5*this.width, this.y-0.5*this.height, this.width, this.height);
            cx.strokeStyle = (this.type === 0) ? "red" : "#00FF00";
            cx.lineWidth = 3;
            cx.stroke();
            cx.font = "20px Consolas";
            cx.fillStyle = (this.type === 0) ? "red" : "#00FF00";
            const msg = this.predClass + " " + this.predConfidence;
            cx.fillText(msg, this.x-0.5*this.width, (this.y-0.5*this.height)-5);
            cx.stroke();
        }
    }

    update(cx: CanvasRenderingContext2D): void {
        this.x = this.x + this.velocityX;
        this.y = this.y + this.velocityY;
        this.draw(cx);
    }

    hitTruck(truck: SpaceObject): boolean{
        const dist = Math.hypot(this.x - truck.x, this.y - truck.y);
        return (dist < truck.height/2 && this.type != 2);
    }

    hitProjectile(projectile: Projectile): boolean{
        const dist = Math.hypot(this.x - projectile.x, this.y - projectile.y);
        return dist < 70;
    }
}