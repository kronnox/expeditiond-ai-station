import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wot-success-overlay',
  templateUrl: './wot-success-overlay.component.html',
  styleUrls: ['./wot-success-overlay.component.scss']
})
export class WotSuccessOverlayComponent {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<any>();

  public setVisible(visible: boolean = true): void {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }
}
