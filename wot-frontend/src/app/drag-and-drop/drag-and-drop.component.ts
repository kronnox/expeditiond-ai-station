import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ImageObject } from '../model/objects/image-object';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {
  
  @ViewChild('dropZone') public dropZone: ElementRef;

  public data: ImageObject[] = [];

  @Input() public imagePaths: string[];
  @Input() public labelClasses: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.imagePaths.forEach(img => {
      this.data.push(new ImageObject(img));
    })
    //this.images = JSON.parse(localStorage.getItem('images') || '');
  }

  public changePosition(event: any, item: ImageObject): void {
    console.log(event);
    console.log(item)
    
    if(event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, this.data.indexOf(item), event.currentIndex);
    } else {
      //const rectZone=this.dropZone.nativeElement.getBoundingClientRect()
      //const rectElement=event.item.element.nativeElement.getBoundingClientRect()
      
      let y=+item.y+event.distance.y;
      let x=+item.x+event.distance.x;
      //const out=y<0 || x<0 || (y>(rectZone.height-rectElement.height)) || (x>(rectZone.width-rectElement.width));
      //if (!out)
      //{
        item.y=y;
        item.x=x;
      //}
    }
  }

  public changeZIndex(item: ImageObject): void {
      for(let i of this.data) {
        (i==item ? i.z = 1 : i.z = 0)
      }
  }
  
  public continue(): void {
    this.router.navigate(['/data-grouping']);
  }
}