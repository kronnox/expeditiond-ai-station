import {Component, OnInit} from '@angular/core';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { ImageObject } from 'src/app/model/image/image-object';

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.scss']
})
export class DataCreationComponent implements OnInit {

  public images: ImageObject[] = [];

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit(): void {
  }

  public async saveCanvas(canvas: NgxDrawingCanvasComponent) {
    const imgPath = canvas.canvas.nativeElement.toDataURL("image/jpeg");
    await fetch(imgPath).then(r => r.blob()).then(blob => this.backendService.predictBlob(blob)).then(res => {
      const confidence = Math.max(...res);
      const classId = res.indexOf(confidence);
      this.images.push(new ImageObject(imgPath, classId));
    });
  }

  public continue(): void {
    localStorage.setItem('created-data', JSON.stringify(this.images));
    this.router.navigate(['/data-labeling']);
  }
}
