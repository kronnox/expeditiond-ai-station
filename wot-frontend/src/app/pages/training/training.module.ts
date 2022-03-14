import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import {LayoutModule} from "../../common/layout/layout.module";
import {BarsModule} from "../../common/bars/bars.module";


@NgModule({
  declarations: [
    TrainingComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    LayoutModule,
    BarsModule
  ]
})
export class TrainingModule { }
