import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WotSuccessOverlayComponent } from 'src/app/common/layout/wot-success-overlay/wot-success-overlay.component';
import { ImageObject } from 'src/app/drag-and-drop/model/image/image-object';
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
  public selectedColor: string = 'white';
  public predictionIndex: number;

  public sortedClasses: number[] = [];

  public classes: string[] = [];

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
    const imgs: ImageObject[] = JSON.parse(localStorage.getItem('labeled-data-all') || '');
    imgs.forEach(element  => {
      if(element.custom){
        this.images.push(element);
      }
    })
    const created: ImageObject[] = JSON.parse(localStorage.getItem('drawn-data') || '');
    created.forEach(element  => {
      if(element.custom){
        this.images.push(element);
      }
    })
    this.classes = this.backendService.classes;
    this.imageSelected(this.images[0]);
  }

  public imageSelected(imageObject: ImageObject) {
    this.sortedClasses = [];
    this.selectedImage = imageObject;
    const sortedPredictions = imageObject.prediction.slice()
    sortedPredictions.sort((a,b) => b - a);
    sortedPredictions.forEach(val => {
      this.sortedClasses.push(imageObject.prediction.indexOf(val));
    });
    this.predictionIndex = imageObject.predictedClass;
    this.selectedColor = (imageObject.predictedClass === imageObject.labeledClass) ? 'var(--color-success)' : 'var(--color-danger)';

  }

  public getClassColor(index: number) {
    if (index != this.predictionIndex) return 'white';
    return 'red';
  }

  public continue(): void {
    void this.router.navigate(['/credits']);
  }

  public getCustomLabel(imageObject: ImageObject): string {
    if ( !imageObject.label) return '';
    if (imageObject.label.indexOf('%') >= 0) return '';
    return imageObject.label;
  }
}
