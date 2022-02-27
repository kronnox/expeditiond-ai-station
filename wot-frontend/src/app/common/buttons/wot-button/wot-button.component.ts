import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wot-button',
  templateUrl: './wot-button.component.html',
  styleUrls: ['./wot-button.component.scss']
})
export class WotButtonComponent implements OnInit {

  @Input() public slot: string = 'inline';
  @Input() public disabled: boolean = false;
  @Input() public icon: string;

  constructor() { }

  ngOnInit(): void {
  }

  public getDisplayStyle(): string {
    switch (this.slot) {
      case 'fill': return 'block';
    }
    return 'inline-block';
  }

  public getFloatStyle(): string {
    switch (this.slot) {
      case 'left': return 'left';
      case 'right': return 'right';
    }
    return 'none';
  }

  public getColorStyle(): string {
    if (this.disabled) {
      return '#717171';
    }
    return '#fff';
  }

  public getBackground(): string {
    if (this.disabled) {
      return 'linear-gradient(45deg, #5a5953, #1d1e25)'
    }
    return '';
  }
}
