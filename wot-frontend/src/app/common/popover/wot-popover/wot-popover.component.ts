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

  constructor() { }

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
