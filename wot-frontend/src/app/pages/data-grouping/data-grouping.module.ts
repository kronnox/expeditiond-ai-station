import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGroupingComponent } from './data-grouping.component';

import { DataGroupingRoutingModule } from './data-grouping-routing.module';
import { LayoutModule } from '../../common/layout/layout.module';
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    DataGroupingComponent
  ],
  imports: [
    CommonModule,
    DataGroupingRoutingModule,
    LayoutModule,
    DragDropModule
  ]
})
export class DataGroupingModule { }
