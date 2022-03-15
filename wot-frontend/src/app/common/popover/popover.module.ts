import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WotPopoverComponent } from './wot-popover/wot-popover.component';



@NgModule({
  declarations: [
    WotPopoverComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WotPopoverComponent
  ]
})
export class PopoverModule { }
