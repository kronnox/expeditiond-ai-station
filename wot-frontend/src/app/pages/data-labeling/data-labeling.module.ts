import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { DataLabelingRoutingModule } from './data-labeling-routing.module';
import { DataLabelingComponent } from './data-labeling.component';
import { LayoutModule } from '../../common/layout/layout.module';
import { ButtonsModule } from 'src/app/common/buttons/buttons.module';
import { DragAndDropModule } from 'src/app/drag-and-drop/drag-and-drop.module';


@NgModule({
  declarations: [
    DataLabelingComponent
  ],
  imports: [
    CommonModule,
    DataLabelingRoutingModule,
    LayoutModule,
    ButtonsModule,
    DragAndDropModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataLabelingModule { }
