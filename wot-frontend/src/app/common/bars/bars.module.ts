import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WotLifeBarComponent } from './wot-life-bar/wot-life-bar.component';
import { WotProgressBarComponent } from './wot-progress-bar/wot-progress-bar.component';



@NgModule({
  declarations: [
    WotLifeBarComponent,
    WotProgressBarComponent
  ],
  imports: [
    CommonModule
  ],
    exports: [
        WotLifeBarComponent,
        WotProgressBarComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarsModule { }
