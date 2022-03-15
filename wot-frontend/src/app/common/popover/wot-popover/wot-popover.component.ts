import { Component, DoCheck, Input, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'wot-popover',
  templateUrl: './wot-popover.component.html',
  styleUrls: ['./wot-popover.component.scss']
})
export class WotPopoverComponent implements OnInit {

  public top: number = 0;
  public left: number = 0;

  public heigth: number = 120;
  public width: number = 180;

  @Input() public text: string = '';

  public active: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public setVisible(element: Element): void {

    const targetDomRect = element.getBoundingClientRect();

    this.top = targetDomRect.y - (this.heigth + 20);
    this.left = (targetDomRect.x + (targetDomRect.width / 2)) - ((this.width+10) / 2);
    this.active = true;
  }

  public setInvisible(): void {
    this.active = false;
  }
}
