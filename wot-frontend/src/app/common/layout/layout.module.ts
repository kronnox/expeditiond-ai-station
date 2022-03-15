import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WotStepInfoComponent } from './wot-step-info/wot-step-info.component';
import { WotRowComponent } from './wot-row/wot-row.component';
import { WotContainerComponent } from './wot-container/wot-container.component';
import { WotPageComponent } from './wot-page/wot-page.component';
import { WotSuccessOverlayComponent } from './wot-success-overlay/wot-success-overlay.component';
import {ButtonsModule} from "../buttons/buttons.module";
import { WotProgressBarComponent } from '../bars/wot-progress-bar/wot-progress-bar.component';
import { WotColumnComponent } from './wot-column/wot-column.component';


@NgModule({
  declarations: [
    WotStepInfoComponent,
    WotRowComponent,
    WotColumnComponent,
    WotContainerComponent,
    WotPageComponent,
    WotSuccessOverlayComponent,
  ],
  exports: [
    WotContainerComponent,
    WotRowComponent,
    WotColumnComponent,
    WotPageComponent,
    WotStepInfoComponent,
    WotSuccessOverlayComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule
  ]
})
export class LayoutModule { }
