import {Component, OnInit} from '@angular/core';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.scss']
})
export class DataCreationComponent implements OnInit {

  public images: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public saveCanvas(canvas: NgxDrawingCanvasComponent): void {
    this.images.push(canvas.canvas.nativeElement.toDataURL("image/jpeg"));
  }
}
