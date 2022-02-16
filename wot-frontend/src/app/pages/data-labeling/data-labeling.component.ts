import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';

@Component({
  selector: 'app-data-labeling',
  templateUrl: './data-labeling.component.html',
  styleUrls: ['./data-labeling.component.scss']
})
export class DataLabelingComponent implements OnInit {

  @ViewChild('dropZone') public dropZone: ElementRef;

  public imagePaths: string[] = ['assets/game/objects/Asteroid/1643121594739.png', 'assets/game/objects/Asteroid/1643121624151.png', 'assets/game/objects/Asteroid/1643121631723.png', 'assets/game/objects/Asteroid/1643204811895.png', 'assets/game/objects/Asteroid/1643208419666.png', 'assets/game/objects/Asteroid/1643208419750.png', 'assets/game/objects/Asteroid/1643208419777.png', 'assets/game/objects/Asteroid/1643208419888.png', 'assets/game/objects/Asteroid/1643208419999.png', 'assets/game/objects/Asteroid/1643208656695.png', 'assets/game/objects/Astronaut/1637760284691.png', 'assets/game/objects/Astronaut/1643203956591.png', 'assets/game/objects/Astronaut/1643203979031.png', 'assets/game/objects/Astronaut/1643204023982.png', 'assets/game/objects/Astronaut/1643204042596.png', 'assets/game/objects/Astronaut/1643204117649.png', 'assets/game/objects/Astronaut/1643313993186.png', 'assets/game/objects/Astronaut/1643314253862.png', 'assets/game/objects/Astronaut/obj-13.png', 'assets/game/objects/Astronaut/obj-7 (1).png', 'assets/game/objects/Envelope/6001.png', 'assets/game/objects/Envelope/6004.png', 'assets/game/objects/Envelope/6005.png', 'assets/game/objects/Envelope/6006.png', 'assets/game/objects/Envelope/6007.png', 'assets/game/objects/Envelope/6011.png', 'assets/game/objects/Envelope/6013.png', 'assets/game/objects/Envelope/6014.png'];

  public images: string[] = [];
  public labelClasses: any[] = [];

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getClasses().then(classes => {
      classes.forEach(element => {
        this.labelClasses.push({
          'class': element,
          'images': []
        })
      });
    });
  }

  public continue(): void {
    this.router.navigate(['/data-grouping']);
  }
}
