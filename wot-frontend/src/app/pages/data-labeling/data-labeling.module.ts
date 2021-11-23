import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { DataLabelingRoutingModule } from './data-labeling-routing.module';
import { DataLabelingComponent } from './data-labeling.component';
import { LayoutModule } from '../../common/layout/layout.module';


@NgModule({
  declarations: [
    DataLabelingComponent
  ],
  imports: [
    CommonModule,
    DataLabelingRoutingModule,
    LayoutModule,
    DragDropModule
  ]
})
export class DataLabelingModule { }
