import { Component, OnInit, ViewChild } from '@angular/core';
import { WotSuccessOverlayComponent } from 'src/app/common/layout/wot-success-overlay/wot-success-overlay.component';
import { ImageObject } from 'src/app/model/image/image-object';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;

  public images: ImageObject[];

  constructor() { }

  ngOnInit(): void {
    this.images = JSON.parse(localStorage.getItem('created-data') || '');

  }


  public done(): void {
    this.successOverlay.setVisible();
  }

  public continue(): void {
  }
}
