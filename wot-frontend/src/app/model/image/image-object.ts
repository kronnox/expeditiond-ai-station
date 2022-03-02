export class ImageObject {

    public imagePath: string;

    public labeledClass: number;

    public prediction: number[];
    public predictedClass: number;

    public label?: string;

    public custom: boolean;

    constructor(img: string, custom: boolean) {
        this.imagePath = img;
        this.custom = custom;
        this.prediction = new Array(9).fill(9);
    }
}
