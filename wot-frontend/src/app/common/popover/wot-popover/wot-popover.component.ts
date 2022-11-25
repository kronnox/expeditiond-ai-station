import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import {animate, animateChild, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'wot-popover',
  templateUrl: './wot-popover.component.html',
  styleUrls: ['./wot-popover.component.scss'],
  animations: [
    trigger('popoverInOut', [
      transition('* => *', [
        animate('.1s ease-in', keyframes([
          style({ opacity: 0, transformOrigin: '50% 100%', transform: 'scale(0.6)', offset: 0 }),
          style({ opacity: 1, transformOrigin: '50% 100%', transform: 'scale(1)', offset: 1 }),
        ])),
      ]),
    ]),
    trigger('popoverText', [
      transition('* => *', [
        animate('.2s ease-in', style({ opacity: 1, offset: 1 })),
      ]),
    ])
  ]
})
export class WotPopoverComponent {

  @ViewChild('popover') popover: ElementRef;

  public top: number = 0;
  public left: number = 0;

  @Input() public width: number = 200;

  public padding: number = 15;

  public text: string = '';

  public active: boolean = false;
  
  public grey: boolean = false;
  public arrowTop: boolean = false;
  public arrowBottom: boolean = true;
  public arrowTopLeft: boolean = false;

  constructor() { }

  public setVisible(element: Element, txt: string, popupNo: number = 0): void {
    this.text = txt;
    setTimeout(()=> {
      const popoverDomRect = this.popover.nativeElement.getBoundingClientRect();
      const targetDomRect = element.getBoundingClientRect();
      switch (popupNo) {
        case 1:
          this.top = targetDomRect.y - 75;
          this.left = (targetDomRect.x + (targetDomRect.width / 2)) - ((popoverDomRect.width) / 2);
          break;       
        case 2:
          this.top = targetDomRect.y - 30;
          this.left = targetDomRect.x;
          break;
        case 3:
          this.arrowTop = true;
          this.arrowBottom = false;
          this.top = 900;
          this.left = (targetDomRect.x + (targetDomRect.width / 2)) - 215;
          this.width = 400;
          break;
        case 4:
          this.arrowTop = true;
          this.arrowBottom = false;
          this.top = 850;
          this.left = targetDomRect.x;
          this.width = 300;
          break;
        case 5:
          this.top = 0;
          this.left = targetDomRect.x + 75;
          this.width = 300
          break;
        case 6:
          this.top = targetDomRect.y - 110;
          this.left = targetDomRect.x;
          break;
        case 7:
          this.arrowTop = false;
          this.arrowBottom = false;
          this.arrowTopLeft = true;
          this.top = 800;
          this.left = targetDomRect.x + 400;
          this.width = 600;
          break;
        default:
          this.top = targetDomRect.y - (popoverDomRect.height + 10);
          this.left = (targetDomRect.x + (targetDomRect.width / 2)) - ((popoverDomRect.width) / 2);
          break;
      }

      this.active = true;      
      this.grey = false;
    }, 200);
  }

  public setInvisible(): void {
    this.active = false;
  }

  public setGrey(): void {
    this.grey = true;
  }
}
