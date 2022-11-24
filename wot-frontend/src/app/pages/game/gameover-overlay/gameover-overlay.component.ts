import { Component, Input, OnInit } from '@angular/core';
import { ImageObject } from 'src/app/drag-and-drop/model/image/image-object';
import { BackendService } from 'src/app/shared/backend.service';

@Component({
  selector: 'gameover-overlay',
  templateUrl: './gameover-overlay.component.html',
  styleUrls: ['./gameover-overlay.component.scss']
})
export class GameoverOverlayComponent implements OnInit {

  @Input() win: boolean;

  public hits: ImageObject[] = [];
  public actions: number[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {    
    this.actions = JSON.parse(localStorage.getItem('analytics-actions') || '[]');
    this.hits = JSON.parse(localStorage.getItem('analytics-hits') || '[]');   
  }

  public  getActionString(action:number): string {
    switch (action) {
      case 0: {
        return 'abgeschossen.'
      }        
      case 1: {
        return 'eingesammelt.'
      }
      case 2: {
        return 'vorbeifliegen gelassen.'
      }
      default: {
        return '';
      }
    }
  }
  
  public getLabelString(input: number): string {
    return this.backendService.classes[input]
  }

}