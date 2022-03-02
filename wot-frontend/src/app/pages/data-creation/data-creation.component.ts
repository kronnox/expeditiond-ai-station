import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { ImageObject } from 'src/app/model/image/image-object';
import {WotSuccessOverlayComponent} from "../../common/layout/wot-success-overlay/wot-success-overlay.component";

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.scss']
})
export class DataCreationComponent implements OnInit {

  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;

  public images: ImageObject[] = [];

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit(): void {
  }

  public async saveCanvas(canvas: NgxDrawingCanvasComponent) {
    const imgPath = canvas.canvas.nativeElement.toDataURL("image/png");

    await fetch(imgPath).then(r => r.blob()).then(blob => this.backendService.predictBlob(blob)).then(res => {
      const confidence = Math.max(...res);
      const classId = res.indexOf(confidence);
      let io = new ImageObject(imgPath, true);
      io.prediction = res;
      io.predictedClass = classId;
      this.images.push(io);
    });

    canvas.clear();
  }

  public done(): void {
    localStorage.setItem('created-data', JSON.stringify(this.images));
    this.successOverlay.setVisible();
  }

  public continue(): void {
    this.router.navigate(['/analytics']);
  }
}
