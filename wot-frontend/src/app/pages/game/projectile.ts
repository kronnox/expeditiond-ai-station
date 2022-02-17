export class Projectile {
    public x: number;
    public y: number;
    
    public velocityX: number;
    public velocityY: number;
    
    private color: string = '#ff0000';
    private radius: number = 6;

    constructor(x: number, y: number, vx: number, vy: number){
        this.x = x;
        this.y = y;
        this.velocityX = vx;
        this.velocityY = vy;
    }

    draw(cx: CanvasRenderingContext2D){
        cx.beginPath();
        cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        cx.fillStyle = this.color;
        cx.fill();
        cx.stroke();
    }

    update(cx: CanvasRenderingContext2D) {
        this.x = this.x + this.velocityX;
        this.y = this.y + this.velocityY;
        this.draw(cx);
    }
}
