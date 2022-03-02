import { ImageObject } from "src/app/model/image/image-object";

export class DragImage {

    public x: number;
    public y: number;
    public z: number;

    public height: number;
    public width: number;

    public imageObject: ImageObject;

    constructor(imageObject: ImageObject, x: number, y: number, size: number){
        this.imageObject = imageObject;
        this.x = x;
        this.y = y;
        this.height = size;
        this.width = size;
        this.z = 0;
    }
}
