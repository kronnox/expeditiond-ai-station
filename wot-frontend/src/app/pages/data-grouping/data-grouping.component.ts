import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';

@Component({
  selector: 'app-data-grouping',
  templateUrl: './data-grouping.component.html',
  styleUrls: ['./data-grouping.component.scss']
})
export class DataGroupingComponent implements OnInit {

  @ViewChild('dropZone') public dropZone: ElementRef;

  public images: string[] = ['UFO', 'Astronaut', 'Komet', 'Asteroid'];
  public data: ImgData[] = [];
  public label_classes = [{
    class: 'gefahr',
    images: []
  },
  {
    class: 'keine gefahr',
    images: []
  }]

  constructor() { }

  ngOnInit(): void {
    for(let o of this.images) {
      console.log(this.images)
      let img = new ImgData(o, '');
      this.data.push(img);
    }
  }

  public changePosition(event: any, item: ImgData): void {
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

  public changeZIndex(item: ImgData): void {
      for(let i of this.data) {
        (i==item ? i.z = 1 : i.z = 0)
      }
  }
}
