export class ImageObject {

    public imagePath: string;

    public objectClass: number;

    public label?: string;

    constructor(img: string, objClass: number, label?: string) {
        this.imagePath = img;
        this.objectClass = objClass;
    }
}
