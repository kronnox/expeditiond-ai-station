import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WotHeaderComponent} from './wot-header/wot-header.component';
import {WotHeaderTitleComponent} from './wot-header-title/wot-header-title.component';
import {WotSidebarComponent} from './wot-sidebar/wot-sidebar.component';
import {WotToolbarComponent} from './wot-toolbar/wot-toolbar.component';
import { WotFooterComponent } from './wot-footer/wot-footer.component';
import { WotStepInfoComponent } from './wot-step-info/wot-step-info.component';
import { WotRowComponent } from './wot-row/wot-row.component';
import { WotContainerComponent } from './wot-container/wot-container.component';
import { WotPageComponent } from './wot-page/wot-page.component';
import { WotSuccessOverlayComponent } from './wot-success-overlay/wot-success-overlay.component';
import {ButtonsModule} from "../buttons/buttons.module";


@NgModule({
    declarations: [
        WotHeaderComponent,
        WotHeaderTitleComponent,
        WotSidebarComponent,
        WotToolbarComponent,
        WotFooterComponent,
        WotStepInfoComponent,
        WotRowComponent,
        WotContainerComponent,
        WotPageComponent,
        WotSuccessOverlayComponent
    ],
    exports: [
        WotContainerComponent,
        WotHeaderComponent,
        WotHeaderTitleComponent,
        WotSidebarComponent,
        WotToolbarComponent,
        WotFooterComponent,
        WotRowComponent,
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
