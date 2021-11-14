import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WotButtonComponent} from './wot-button/wot-button.component';

@NgModule({
  declarations: [
    WotButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WotButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonsModule { }
