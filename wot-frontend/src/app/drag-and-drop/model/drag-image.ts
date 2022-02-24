import { ImageObject } from "src/app/model/image/image-object";

export class DragImage extends ImageObject {

    public x: number;
    public y: number;
    public z: number;

    public height: number;
    public width: number;

    constructor(imageObject: ImageObject, x: number, y: number, size: number){
        super(imageObject.imagePath, imageObject.objectClass);
        this.label = imageObject.label;
        this.x = x;
        this.y = y;
        this.height = size;
        this.width = size;
    }
}
