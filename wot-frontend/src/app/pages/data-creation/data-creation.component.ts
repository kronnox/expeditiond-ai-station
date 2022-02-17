import {Component, OnInit} from '@angular/core';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.scss']
})
export class DataCreationComponent implements OnInit {

  public images: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public saveCanvas(canvas: NgxDrawingCanvasComponent): void {
    this.images.push(canvas.canvas.nativeElement.toDataURL("image/jpeg"));
    localStorage.setItem('images', JSON.stringify(this.images));
  }

  public continue(): void {
    this.router.navigate(['/data-overview']);
  }
}
