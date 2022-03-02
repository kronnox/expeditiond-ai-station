import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {LayoutModule} from "../../common/layout/layout.module";
import {ButtonsModule} from "../../common/buttons/buttons.module";
import {LandingRoutingModule} from "./landing-routing.module";

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LayoutModule,
    ButtonsModule
  ]
})
export class LandingModule { }
