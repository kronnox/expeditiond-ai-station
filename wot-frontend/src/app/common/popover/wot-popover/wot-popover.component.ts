import { AfterViewInit, Component, DoCheck, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'wot-popover',
  templateUrl: './wot-popover.component.html',
  styleUrls: ['./wot-popover.component.scss']
})
export class WotPopoverComponent implements OnInit {

  @ViewChild('popover') popover: ElementRef;

  public top: number = 0;
  public left: number = 0;

  @Input() public width: number = 200;
  
  public padding: number = 15;

  public text: string = '';

  public active: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public setVisible(element: Element, txt: string): void {
    this.text = txt;
    this.active = true;
    setTimeout(()=> {
      const popoverDomRect = this.popover.nativeElement.getBoundingClientRect();
      const targetDomRect = element.getBoundingClientRect();
      this.top = targetDomRect.y - (popoverDomRect.height + 10);
      this.left = (targetDomRect.x + (targetDomRect.width / 2)) - ((popoverDomRect.width) / 2);
    }, 0);
  }

  public setInvisible(): void {
    this.active = false;
  }
}
