import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { DataLabelingRoutingModule } from './data-labeling-routing.module';
import { DataLabelingComponent } from './data-labeling.component';
import { LayoutModule } from '../../common/layout/layout.module';
import { ButtonsModule } from 'src/app/common/buttons/buttons.module';


@NgModule({
  declarations: [
    DataLabelingComponent
  ],
  imports: [
    CommonModule,
    DataLabelingRoutingModule,
    LayoutModule,
    DragDropModule,
    ButtonsModule
  ]
})
export class DataLabelingModule { }
