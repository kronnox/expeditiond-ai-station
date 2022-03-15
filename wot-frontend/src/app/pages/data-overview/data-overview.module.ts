import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataOverviewComponent } from './data-overview.component';
import {DataOverviewRoutingModule} from './data-overview-routing.module';
import {LayoutModule} from "../../common/layout/layout.module";
import { ButtonsModule } from 'src/app/common/buttons/buttons.module';
import { PopoverModule } from 'src/app/common/popover/popover.module';



@NgModule({
  declarations: [
    DataOverviewComponent
  ],
  imports: [
    CommonModule,
    DataOverviewRoutingModule,
    LayoutModule,
    ButtonsModule,
    PopoverModule
  ]
})
export class DataOverviewModule { }
