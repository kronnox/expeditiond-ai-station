export class ImageObject {

    public imagePath: string;
    public x: number;
    public y: number;
    public z: number;
    public height: number;
    public width: number;

    public class: number;

    constructor(img: string) {
        this.imagePath = img;
        this.x = 600*Math.random();
        this.y = 600*Math.random();
        this.z = 100;
        this.height = 100;
        this.width = 100;
    }
}
