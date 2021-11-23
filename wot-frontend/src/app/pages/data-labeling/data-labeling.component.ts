import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-data-labeling',
  templateUrl: './data-labeling.component.html',
  styleUrls: ['./data-labeling.component.scss']
})
export class DataLabelingComponent implements OnInit {

  public images: string[] = [];
  public label_classes = [{
    class: 'ufo',
    images: []
  },
  {
    class: 'astronaut',
    images: []
  }]

  constructor() { }

  ngOnInit(): void {
    this.images = JSON.parse(localStorage.getItem('images') || '');
    for(let i = 0; i < 3; i++) {
      this.images.push(this.images[i%3]);
    }
  }

  onDrop(event: any) {
    console.log(event);
    if(event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.images, event.currentIndex, event.previousIndex);
    }
    console.log(this.label_classes);
  }

}
