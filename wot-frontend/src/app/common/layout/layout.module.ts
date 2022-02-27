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
import { WotStepTitleComponent } from './wot-step-title/wot-step-title.component';
import { WotStepDescriptionComponent } from './wot-step-description/wot-step-description.component';


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
        WotStepTitleComponent,
        WotStepDescriptionComponent
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
    WotStepDescriptionComponent,
    WotStepTitleComponent
  ],
    imports: [
        CommonModule
    ]
})
export class LayoutModule { }
