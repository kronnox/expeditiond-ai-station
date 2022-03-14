import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'wot-progress-bar',
  templateUrl: './wot-progress-bar.component.html',
  styleUrls: ['./wot-progress-bar.component.scss']
})
export class WotProgressBarComponent implements OnInit, OnChanges {
  
  @Input() progress: number;
  @Input() total: number;
  @Input() width: number;
  @Input() height: number;

  color: string = 'red';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.progress) {
      this.progress = 0;
    }
    if(this.total === 0) {
      this.total = this.progress;
    } else if(!this.total) {
      this.total = 100;
    }
    if(this.progress > this.total) {
      this.progress = 100;
      this.total = 100;
    }
    this.progress = (this.progress / this.total) * 100;
    if(this.progress < 55) {
      this.color = 'red';
    } else if(this.progress < 75) {
      this.color= 'yellow';
    } else {
      this.color = 'green';
    }
  }

  ngOnInit(): void {
    
  }

}
