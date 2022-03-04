import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, DropListRef, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { DragAndDropComponent } from 'src/app/drag-and-drop/drag-and-drop.component';
import { ImageObject } from 'src/app/model/image/image-object';
import { DropLabel } from 'src/app/drag-and-drop/model/drop-label';
import { ImageService } from 'src/app/shared/image.service';
import {WotSuccessOverlayComponent} from "../../common/layout/wot-success-overlay/wot-success-overlay.component";

@Component({
  selector: 'app-data-labeling',
  templateUrl: './data-labeling.component.html',
  styleUrls: ['./data-labeling.component.scss']
})
export class DataLabelingComponent implements OnInit {

  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;

  public images: ImageObject[] = [];
  public labels: DropLabel[] = [];

  constructor(private router: Router, private backendService: BackendService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.images = this.imageService.getNImagesOfEach(1);
    const customImages: ImageObject[] = JSON.parse(localStorage.getItem('created-data') || '');

    this.images = this.images.concat(customImages);

    let labels: DropLabel[] = [];
    this.backendService.classes.forEach(function(element, i) {
      labels.push(new DropLabel(i, element))
    });
    this.labels = labels;
  }

  public done(ddc :DragAndDropComponent): void {
    let imageObjects: ImageObject[] = [];
    ddc.labels.forEach(element => {
      if(element.children.length === 0) {
        let io = this.imageService.getNImagesOfClass(1,element.labelID)[0];
        io.label = element.labelName;
        io.labeledClass = element.labelID;
        imageObjects.push(io);
      }
      element.children.forEach(item => {
        item.imageObject.labeledClass = element.labelID;
        item.imageObject.label = this.backendService.classes[element.labelID];
        let indexDouble = -1;
        for(let i = 0; i < imageObjects.length; i++) {
          if(imageObjects[i].labeledClass === item.imageObject.labeledClass) {
            indexDouble = i
            break;
          }
        }
        if(indexDouble != -1) {
          if(item.imageObject.custom) {
            imageObjects.splice(indexDouble, 1);
            imageObjects.push(item.imageObject);
          }
        } else {
          imageObjects.push(item.imageObject);
        }
      })
    });
    this.successOverlay.setVisible();
    localStorage.setItem('labeled-data', JSON.stringify(imageObjects));
  }

  public continue(): void {
    this.router.navigate(['/data-grouping']);
  }
}
