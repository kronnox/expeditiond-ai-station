import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { DragAndDropComponent } from 'src/app/drag-and-drop/drag-and-drop.component';
import { ImageObject } from 'src/app/model/image/image-object';
import { DropLabel } from 'src/app/drag-and-drop/model/drop-label';
import { ImageService } from 'src/app/shared/image.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import {WotSuccessOverlayComponent} from "../../common/layout/wot-success-overlay/wot-success-overlay.component";

@Component({
  selector: 'app-data-grouping',
  templateUrl: './data-grouping.component.html',
  styleUrls: ['./data-grouping.component.scss']
})
export class DataGroupingComponent implements OnInit {

  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;

  public images: ImageObject[] = [];
  public labels: DropLabel[] = [];

  private types: string[] = ['Abschießen', 'Einsammeln', 'Vorbeifliegen lassen'];

  constructor(private router: Router, private backendService: BackendService, private imageService: ImageService) { }

  ngOnInit(): void {
    let inserted: number[] = [];
    const customImages: ImageObject[] = JSON.parse(localStorage.getItem('created-data') || '');
    customImages.forEach(element => {
      element.label = this.backendService.classes[element.objectClass];
      inserted.push(element.objectClass);
      this.images.push(element);
    })
    for(let i = 0; i < this.backendService.classes.length; i++) {
      if(inserted.indexOf(i) === -1){
        let io = this.imageService.getNImagesOfClass(1, i)[0];
        io.label = this.backendService.classes[io.objectClass];
        this.images.push(io);
      }
    }

    let labels: DropLabel[] = [];
    this.types.forEach(function(element, i) {
      labels.push(new DropLabel(i, element));
    });
    this.labels = labels;
  }

  public done(ddc: DragAndDropComponent): void {
    let grouping: number[] = [];
    ddc.labels.forEach(element  => {
      element.children.forEach(item => {
        grouping[item.objectClass] = element.labelID;
      })
    })
    localStorage.setItem('grouping', JSON.stringify(grouping));
    this.successOverlay.setVisible();
  }

  public continue(): void {
    this.router.navigate(['/game']);
  }
}
