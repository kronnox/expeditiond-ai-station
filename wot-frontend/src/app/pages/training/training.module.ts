import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import {LayoutModule} from "../../common/layout/layout.module";
import {BarsModule} from "../../common/bars/bars.module";
import {ButtonsModule} from "../../common/buttons/buttons.module";
import { NeuralNetSimComponent } from './neural-net-sim/neural-net-sim.component';


@NgModule({
  declarations: [
    TrainingComponent,
    NeuralNetSimComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    LayoutModule,
    BarsModule,
    ButtonsModule
  ]
})
export class TrainingModule { }
