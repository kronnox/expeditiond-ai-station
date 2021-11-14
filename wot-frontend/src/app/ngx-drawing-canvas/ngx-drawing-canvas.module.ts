import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDrawingCanvasComponent} from "./ngx-drawing-canvas.component";


@NgModule({
  declarations: [
    NgxDrawingCanvasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxDrawingCanvasComponent
  ]
})
export class NgxDrawingCanvasModule { }
