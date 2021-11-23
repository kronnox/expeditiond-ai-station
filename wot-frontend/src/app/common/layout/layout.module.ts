import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WotHeaderComponent} from './wot-header/wot-header.component';
import {WotHeaderTitleComponent} from './wot-header-title/wot-header-title.component';
import {WotSidebarComponent} from './wot-sidebar/wot-sidebar.component';
import {WotToolbarComponent} from './wot-toolbar/wot-toolbar.component';
import { WotFooterComponent } from './wot-footer/wot-footer.component';


@NgModule({
    declarations: [
        WotHeaderComponent,
        WotHeaderTitleComponent,
        WotSidebarComponent,
        WotToolbarComponent,
        WotFooterComponent
    ],
  exports: [
    WotHeaderComponent,
    WotHeaderTitleComponent,
    WotSidebarComponent,
    WotToolbarComponent,
    WotFooterComponent
  ],
    imports: [
        CommonModule
    ]
})
export class LayoutModule { }
