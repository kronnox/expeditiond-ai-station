export class ImgData {
    public image: string;
    public id: string;
    public x: number;
    public y: number;
    public z: number;

    constructor(img: string, id: string) {
        this.image = img;
        this.id = id;
        this.x = 600*Math.random();
        this.y = 600*Math.random();
        this.z = 100;
    }
}