import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wot-success-overlay',
  templateUrl: './wot-success-overlay.component.html',
  styleUrls: ['./wot-success-overlay.component.scss']
})
export class WotSuccessOverlayComponent {

  @Input() buttonLabel: string = 'Zum nächsten Schritt';

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<any>();

  @Input() header: string = 'Bravo!';
  @Input() showIcon: boolean = true;

  public setVisible(visible: boolean = true): void {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }
}
