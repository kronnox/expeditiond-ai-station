import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataOverviewComponent } from './data-overview.component';
import {DataOverviewRoutingModule} from './data-overview-routing.module';
import {LayoutModule} from "../../common/layout/layout.module";



@NgModule({
  declarations: [
    DataOverviewComponent
  ],
  imports: [
    CommonModule,
    DataOverviewRoutingModule,
    LayoutModule
  ]
})
export class DataOverviewModule { }
