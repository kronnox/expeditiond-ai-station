import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  public skip: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout( ()=> {
      this.skip = true;
    }, 20000)
  }

  public quit(): void {
    this.router.navigate(['/landing']);
  }

}
