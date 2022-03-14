import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wot-life-bar',
  templateUrl: './wot-life-bar.component.html',
  styleUrls: ['./wot-life-bar.component.scss']
})
export class WotLifeBarComponent implements OnInit {
  
  @Input() public maxLifes: number;
  @Input() public lifes: number;

  constructor() { }

  ngOnInit(): void {
  }

}
