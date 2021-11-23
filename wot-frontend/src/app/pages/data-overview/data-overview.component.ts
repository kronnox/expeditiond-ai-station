import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent implements OnInit {

  public images: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.images = JSON.parse(localStorage.getItem('images') || '');
    for(let i = 0; i < 100; i++) {
      this.images.push(this.images[i%3]);
    }
  }

  public continue(): void {
    this.router.navigate(['/data-labeling']);
  }
}
