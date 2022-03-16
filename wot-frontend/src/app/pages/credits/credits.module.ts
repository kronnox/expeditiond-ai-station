import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditsRoutingModule } from './credits-routing.module';
import { CreditsComponent } from './credits.component';
import { ButtonsModule } from 'src/app/common/buttons/buttons.module';


@NgModule({
  declarations: [
    CreditsComponent
  ],
  imports: [
    CommonModule,
    CreditsRoutingModule,
    ButtonsModule
  ]
})
export class CreditsModule { }
