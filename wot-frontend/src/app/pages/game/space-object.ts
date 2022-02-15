import { BackendService } from "src/app/shared/backend.service";
import { Projectile } from "./projectile";

export class SpaceObject {
    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public detected: boolean;
    public projectile: Projectile;
    public prediciton: number;
    
    private velocity_x: number;
    private velocity_y: number;

    public image_path: string;
    private image: HTMLImageElement;

    private backendService: BackendService;

    public predConfidence: string;
    public predClass: string;
    public shoot: boolean = true;

    constructor(x: number, y: number, vx: number, vy: number, img_path: string, width: number, height: number){
        this.x = x;
        this.y = y;
        this.velocity_x = vx;
        this.velocity_y = vy;
        this.image = new Image();
        this.image.src = img_path;
        this.image_path = img_path;
        this.width = width;
        this.height = height;
    }

    draw(cx: CanvasRenderingContext2D): void{
        cx.drawImage(this.image, (this.x-this.width/2), (this.y-this.height/2), this.width, this.height);
        if(this.detected){
            cx.beginPath();
            cx.rect(this.x-0.5*this.width, this.y-0.5*this.height, this.width, this.height);
            cx.strokeStyle = this.shoot ? "red" : "#00FF00";
            cx.lineWidth = 3;
            cx.stroke();
            cx.font = "20px Consolas";
            cx.fillStyle = this.shoot ? "red" : "#00FF00";
            const msg = this.predClass + " " + this.predConfidence;
            cx.fillText(msg, this.x-0.5*this.width, (this.y-0.5*this.height)-5);
            cx.stroke();
        }
    }

    update(cx: CanvasRenderingContext2D): void {
        this.x = this.x + this.velocity_x;
        this.y = this.y + this.velocity_y;
        this.draw(cx);
    }

    hit_truck(truck: SpaceObject): boolean{
        const dist = Math.hypot(this.x - truck.x, this.y - truck.y);
        return dist < truck.height/2;
    }

    hit_projectile(projectile: Projectile): boolean{
        const dist = Math.hypot(this.x - projectile.x, this.y - projectile.y);
        return dist < 70;
    }

    detect_object(): void{
        this.detected = true;
    }
}