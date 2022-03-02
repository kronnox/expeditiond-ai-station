import { Component, OnInit, ViewChild } from '@angular/core';
import { WotSuccessOverlayComponent } from 'src/app/common/layout/wot-success-overlay/wot-success-overlay.component';
import { ImageObject } from 'src/app/model/image/image-object';
import { BackendService } from 'src/app/shared/backend.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;

  public images: ImageObject[] = [];

  public selectedImage: ImageObject;
  public predictionIndex: number;

  public classes: string[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    const imgs: ImageObject[] = JSON.parse(localStorage.getItem('labeled-data') || '');
    console.log(imgs)
    imgs.forEach(element  => {
      if(element.custom){
        this.images.push(element);
      }
    })

    this.classes = this.backendService.classes;
  }

  public imageSelected(imageObject: ImageObject) {
    this.selectedImage = imageObject;
    this.predictionIndex = imageObject.predictedClass;
  }

  public getClassColor(index: number) {
    if (index != this.predictionIndex) return 'white';
    return 'red';
  }

  public done(): void {
    this.successOverlay.setVisible();
  }

  public continue(): void {
  }
}
