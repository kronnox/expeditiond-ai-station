import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-labeling',
  templateUrl: './data-labeling.component.html',
  styleUrls: ['./data-labeling.component.scss']
})
export class DataLabelingComponent implements OnInit {

  @ViewChild('dropZone') public dropZone: ElementRef;

  public images: string[] = [];
  public data: ImgData[] = [];
  public label_classes = [{
    class: 'ufo',
    images: []
  },
  {
    class: 'astronaut',
    images: []
  },
  {
    class: 'comet',
    images: []
  }]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.images = JSON.parse(localStorage.getItem('images') || '');
    for(let i = 0; i < 3; i++) {
      let img = new ImgData(this.images[i%3], 'ufo');
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
  
  public continue(): void {
    this.router.navigate(['/data-grouping']);
  }
}
