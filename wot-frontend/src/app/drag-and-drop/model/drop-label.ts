import { ImageObject } from "src/app/model/image/image-object";

export class DropLabel {
    public labelID: number;
    public labelName: string;
    public childs: ImageObject[];

    constructor(labelID: number, labelName: string){
        this.labelID = labelID;
        this.labelName = labelName;
        this.childs = [];
    }
}
