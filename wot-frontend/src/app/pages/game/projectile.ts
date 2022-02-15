export class Projectile {
    public x: number;
    public y: number;
    
    public velocity_x: number;
    public velocity_y: number;
    
    private color: string = '#ff0000';
    private radius: number = 6;

    constructor(x: number, y: number, vx: number, vy: number){
        this.x = x;
        this.y = y;
        this.velocity_x = vx;
        this.velocity_y = vy;
    }

    draw(cx: CanvasRenderingContext2D){
        cx.beginPath();
        cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        cx.fillStyle = this.color;
        cx.fill();
        cx.stroke();
    }

    update(cx: CanvasRenderingContext2D) {
        this.x = this.x + this.velocity_x;
        this.y = this.y + this.velocity_y;
        this.draw(cx);
    }
}
