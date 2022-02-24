import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterContentInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ImageObject } from '../model/image/image-object';
import { DropLabel } from './model/drop-label';
import { DragImage } from './model/drag-image';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements AfterViewInit {
  
  @ViewChild('dropZone') public dropZone: ElementRef;
  @ViewChild('dragZone') public dragZone: ElementRef;

  @Input() public data: ImageObject[];

  public dragObjects: DragImage[] = [];
  @Input() public labels: DropLabel[];

  constructor(private router: Router, private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const size = 200;
      const rectZone = this.dragZone.nativeElement.getBoundingClientRect();
      this.data.forEach(element => {
        const y = Math.random()*(rectZone.height - size) + (rectZone.y);
        const x = Math.random()*(rectZone.width - size) + (rectZone.x);
        this.dragObjects = [...this.dragObjects, new DragImage(element, x, y, size)];
      })
      this.cdRef.detectChanges();
      console.log(this.dragObjects)
    }, 0);
    
  }

  public changePosition(event: any, item: DragImage): void {

    if(event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, this.dragObjects.indexOf(item), event.currentIndex);
    } else {
      const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
      const rectElement=event.item.element.nativeElement.getBoundingClientRect()
      
      let y =+ item.y+event.distance.y;
      let x =+ item.x+event.distance.x;

      if(y < rectZone.top) {
        y = rectZone.top;
      }
      if(x < rectZone.left) {
        x = rectZone.left;
      }
      if(y > (rectZone.bottom-rectElement.height)) {
        y = rectZone.bottom-rectElement.height;
      }
      if(x > (rectZone.right-rectElement.width)) {
        x = rectZone.right-rectElement.width;
      }

      item.y=y;
      item.x=x;
    }
  }

  public changeZIndex(item: DragImage): void {
      for(let i of this.dragObjects) {
        (i==item ? i.z = 1 : i.z = 0)
      }
  }
  
  public continue(): void {
    this.router.navigate(['/data-grouping']);
  }
}