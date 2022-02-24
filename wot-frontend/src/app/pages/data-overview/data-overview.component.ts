import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageObject } from 'src/app/model/image/image-object';
import { BackendService } from 'src/app/shared/backend.service';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent implements OnInit {

  public images: ImageObject[] = [];

  constructor(private router: Router, private imageService: ImageService) { }

  ngOnInit(): void {
    let imgs = this.imageService.getNImagesOfEach(10);
    while(imgs.length > 0) {
      const index = Math.trunc(Math.random()*imgs.length);
      this.images.push(imgs[index]);
      imgs.splice(index, 1);
    }
  }

  public continue(): void {
    this.router.navigate(['/data-creation']);
  }
}
