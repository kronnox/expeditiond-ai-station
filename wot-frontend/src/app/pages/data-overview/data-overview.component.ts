import {Component, DoCheck, HostListener, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { WotPopoverComponent } from 'src/app/common/popover/wot-popover/wot-popover.component';
import { ImageObject } from 'src/app/model/image/image-object';
import { BackendService } from 'src/app/shared/backend.service';
import { ImageService } from 'src/app/shared/image.service';
import {WotSuccessOverlayComponent} from "../../common/layout/wot-success-overlay/wot-success-overlay.component";

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent implements OnInit {

  @HostListener('scroll')
  handleScroll() {
    this.popover.setInvisible();
  }

  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;
  @ViewChild('popover') public popover: WotPopoverComponent;

  public images: ImageObject[] = [];

  public currentDescription: string = "Das ist unser Astronaut Norbert. Er konnte leider in einer Mission nicht gerettet werden und ist elendig verreckt."

  constructor(private router: Router, private imageService: ImageService) { }

  ngOnInit(): void {
    let imgs = this.imageService.getNImagesOfEach(10);
    while(imgs.length > 0) {
      const index = Math.trunc(Math.random()*imgs.length);
      this.images.push(imgs[index]);
      imgs.splice(index, 1);
    }
  }

  public done(): void {
    this.successOverlay.setVisible();
  }

  public continue(): void {
    this.popover.setInvisible();
    this.router.navigate(['/data-creation']);
  }

  public showInfo(event: Event): void {
    this.popover.setInvisible();
    const target: Element = event.target as Element;
    this.popover.setVisible(target);
  }
}
