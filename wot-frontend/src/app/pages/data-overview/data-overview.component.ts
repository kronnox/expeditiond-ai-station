import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent implements OnInit {

  public images: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.images = JSON.parse(localStorage.getItem('images') || '');
    for(let i = 0; i < 100; i++) {
      this.images.push(this.images[i%3]);
    }
  }

}
