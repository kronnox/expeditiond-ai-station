import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragAndDropComponent } from './drag-and-drop.component';



@NgModule({
  declarations: [
    DragAndDropComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    DragAndDropComponent
  ]
})
export class DragAndDropModule { }
