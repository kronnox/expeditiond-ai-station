import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wot-frontend';

  public showResetOverlay: boolean = false;

  constructor(public router: Router) { }

  public confirmRestart(): void {
    this.showResetOverlay = true;
  }

  public restart(): void {
    this.router.navigate(['/landing']).then(() => {
      window.location.reload();
    });
    this.showResetOverlay = false;
  }

  public decline(): void {
    this.showResetOverlay = false;
  }
}
