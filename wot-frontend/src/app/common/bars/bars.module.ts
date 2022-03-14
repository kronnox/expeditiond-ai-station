import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WotLifeBarComponent } from './wot-life-bar/wot-life-bar.component';



@NgModule({
  declarations: [
    WotLifeBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WotLifeBarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarsModule { }
