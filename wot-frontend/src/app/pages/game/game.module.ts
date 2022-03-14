import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { NgxDrawingCanvasModule } from 'src/app/ngx-drawing-canvas/ngx-drawing-canvas.module';
import { ButtonsModule } from 'src/app/common/buttons/buttons.module';
import { BarsModule } from 'src/app/common/bars/bars.module';
import { GameoverOverlayComponent } from './gameover-overlay/gameover-overlay.component';
import { LayoutModule } from "../../common/layout/layout.module";
import { NebulaComponent } from './nebula/nebula.component';


@NgModule({
  declarations: [
    GameComponent,
    GameoverOverlayComponent,
    NebulaComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    NgxDrawingCanvasModule,
    ButtonsModule,
    LayoutModule,
    BarsModule
  ]
})
export class GameModule { }
