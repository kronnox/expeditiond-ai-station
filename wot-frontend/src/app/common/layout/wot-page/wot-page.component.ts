import {Component, Input} from '@angular/core';

@Component({
  selector: 'wot-page',
  templateUrl: './wot-page.component.html',
  styleUrls: ['./wot-page.component.scss']
})
export class WotPageComponent {

  @Input() width: string = '1600px';
}
