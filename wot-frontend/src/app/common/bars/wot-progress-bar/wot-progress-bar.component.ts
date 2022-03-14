import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'wot-progress-bar',
  templateUrl: './wot-progress-bar.component.html',
  styleUrls: ['./wot-progress-bar.component.scss']
})
export class WotProgressBarComponent {

  @Input() progress: number = 0;
  @Input() total: number = 100;

  @Input() label: string = '';
  @Input() labelSize: string = '1em';

  @Input() width: string = '100%';
  @Input() height: string = '24px';

  @Input('background') bgMode: string = 'linear-gradient(45deg, var(--color-primary-light), var(--color-secondary-light))';

  constructor() { }

  public getNormedProgress(): number {
    return (this.progress / this.total) * 100;
  }

  public getBackground(): string {
    if (this.bgMode === 'auto') {
      if (this.getNormedProgress() < 55) {
        return 'var(--color-danger)';
      } else if (this.getNormedProgress() < 75) {
        return 'var(--color-warning)';
      } else {
        return 'var(--color-success)';
      }
    } else {
      return this.bgMode;
    }
  }

}
