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
  }

  public continue(): void {
    this.router.navigate(['/data-creation']);
  }
}
