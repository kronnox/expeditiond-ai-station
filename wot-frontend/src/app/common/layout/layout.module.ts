import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WotStepInfoComponent } from './wot-step-info/wot-step-info.component';
import { WotRowComponent } from './wot-row/wot-row.component';
import { WotContainerComponent } from './wot-container/wot-container.component';
import { WotPageComponent } from './wot-page/wot-page.component';
import { WotSuccessOverlayComponent } from './wot-success-overlay/wot-success-overlay.component';
import {ButtonsModule} from "../buttons/buttons.module";
import { WotProgressBarComponent } from './wot-progress-bar/wot-progress-bar.component';


@NgModule({
    declarations: [
        WotStepInfoComponent,
        WotRowComponent,
        WotContainerComponent,
        WotPageComponent,
        WotSuccessOverlayComponent,
        WotProgressBarComponent,
        WotProgressBarComponent
    ],
    exports: [
        WotContainerComponent,
        WotRowComponent,
        WotPageComponent,
        WotStepInfoComponent,
        WotSuccessOverlayComponent,
        WotProgressBarComponent
    ],
  imports: [
    CommonModule,
    ButtonsModule
  ]
})
export class LayoutModule { }
