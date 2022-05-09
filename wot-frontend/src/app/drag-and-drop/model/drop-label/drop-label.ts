import { ImageObject } from "src/app/drag-and-drop/model/image/image-object";
import { DragImage } from "../draw-image/drag-image";

export class DropLabel {
    public labelID: number;
    public labelName: string;
    public children: DragImage[];

    constructor(labelID: number, labelName: string){
        this.labelID = labelID;
        this.labelName = labelName;
        this.children = [];
    }
}
