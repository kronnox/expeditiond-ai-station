import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, DropListRef, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { DragAndDropComponent } from 'src/app/drag-and-drop/drag-and-drop.component';
import { ImageObject } from 'src/app/model/image/image-object';
import { DropLabel } from 'src/app/drag-and-drop/model/drop-label';

@Component({
  selector: 'app-data-labeling',
  templateUrl: './data-labeling.component.html',
  styleUrls: ['./data-labeling.component.scss']
})
export class DataLabelingComponent implements OnInit {

  @ViewChild('dropZone') public dropZone: ElementRef;

  public imagePaths = [{'img': 'assets/game/objects/Asteroid/1643121594739.png', 'objClass': 0}, {'img': 'assets/game/objects/Astronaut/1637760284691.png', 'objClass': 1}, {'img': 'assets/game/objects/Envelope/6001.png', 'objClass': 2}, {'img': 'assets/game/objects/FlyingSaucer/6963.png', 'objClass': 3}, {'img': 'assets/game/objects/Lootbox/1637756179698.png', 'objClass': 4}, {'img': 'assets/game/objects/RaceCar/13361.png', 'objClass': 5}, {'img': 'assets/game/objects/Satellite/14081.png', 'objClass': 6}, {'img': 'assets/game/objects/SatelliteDish/14089.png', 'objClass': 7}, {'img': 'assets/game/objects/SpaceShuttle/15762.png', 'objClass': 8}];

  public images: ImageObject[] = [];
  public labelClasses: DropLabel[] = [];

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit(): void {
    this.images = JSON.parse(localStorage.getItem('created-data') || '');

    this.imagePaths.forEach(element => {
      this.images.push(new ImageObject(element.img, element.objClass));
    })

    this.backendService.getClasses().then(classes => {
      let labels: DropLabel[] = [];
      classes.forEach(function(element, i) {
        labels.push(new DropLabel(i, element))
      });
      this.labelClasses = labels;
    });
  }

  public continue(ddc :DragAndDropComponent): void {
    //TODO: save labels

    this.router.navigate(['/data-grouping']);
  }
}
