import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, Point, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImgData } from './image_data';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';

@Component({
  selector: 'app-data-grouping',
  templateUrl: './data-grouping.component.html',
  styleUrls: ['./data-grouping.component.scss']
})
export class DataGroupingComponent implements OnInit {

  @ViewChild('dropZone') public dropZone: ElementRef;

  public imagePaths: string[] = ['assets/game/objects/Asteroid/1643121594739.png', 'assets/game/objects/Astronaut/1643203956591.png', 'assets/game/objects/Envelope/6004.png'];

  public images: string[] = [];
  public labelClasses: any[] = [];

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit(): void {
    const types = ['shoot', 'collect', 'fly by'];
    types.forEach(element => {
      this.labelClasses.push({
        'class': element,
        'images': []
      })
    });
  }

  public continue(): void {
    this.router.navigate(['/data-grouping']);
  }
}
