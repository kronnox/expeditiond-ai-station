import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wot-button',
  templateUrl: './wot-button.component.html',
  styleUrls: ['./wot-button.component.scss']
})
export class WotButtonComponent implements OnInit {

  @Input() public slot: string = 'inline';
  @Input() public disabled: boolean = false;
  @Input() public icon: string;
  @Input() public texticon: string;
  @Input() public texticon2: string;
  @Input() public texticon3: string;
  @Input() public texticonCount: string;
  @Input() public texticonLabel: string;
  @Input() public texticonLabelOne: string;

  @Output() press = new EventEmitter();
  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (this.disabled){
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.press.next(e);
    }
  }

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
      return 'var(--color-lightgray)';
    }
    return '#fff';
  }

  public getBackground(): string {
    if (this.disabled) {
      return 'linear-gradient(45deg, var(--color-gray), var(--color-darkgray))'
    }
    return '';
  }

  public getWidth(): string {
    if (this.texticon) {
      return '250px';      
    }
    return '';
  }

  public getTextAlign(): string {
    if (this.texticon) {
      return 'center';      
    }
    return '';
  }
}
