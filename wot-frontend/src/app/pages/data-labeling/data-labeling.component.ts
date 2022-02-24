import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, DropListRef, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { DragAndDropComponent } from 'src/app/drag-and-drop/drag-and-drop.component';
import { ImageObject } from 'src/app/model/image/image-object';
import { DropLabel } from 'src/app/drag-and-drop/model/drop-label';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-data-labeling',
  templateUrl: './data-labeling.component.html',
  styleUrls: ['./data-labeling.component.scss']
})
export class DataLabelingComponent implements OnInit {

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

  public continue(ddc :DragAndDropComponent): void {
    ddc.labels.forEach(element => {
      element.children.forEach(item => {
        if(element.labelID != item.objectClass){

        }
      })
    })

    this.router.navigate(['/data-grouping']);
  }
}
