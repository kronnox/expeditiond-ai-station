import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ImageService} from "../../shared/image.service";
import {ImageObject} from "../../model/image/image-object";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {NeuralNetSimComponent} from "./neural-net-sim/neural-net-sim.component";
import {Router} from "@angular/router";
import {WotSuccessOverlayComponent} from "../../common/layout/wot-success-overlay/wot-success-overlay.component";
import {beaker} from "ionicons/icons";

export const imageAnimation = trigger('imageAnimation', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),
    query(':enter', stagger('50ms', [
      animate('.2s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateX(-50%)', offset: 0 }),
        style({ opacity: .5, transform: 'translateX(-10px) scale(1.1)', offset: 0.3 }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
      ]))]), { optional: true }),
  ]),
]);
export const colorAnimation = trigger('colorAnimation', [
  state('0', style({
    borderColor: 'var(--color-success)'
  })),
  state('1', style({
    borderColor: 'var(--color-danger)'
  })),
  transition('* => *', animate('.1s ease-in'))
]);

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  animations: [ imageAnimation, colorAnimation ]
})
export class TrainingComponent implements OnInit {

  @ViewChild('neuralNet') public neuralNet: NeuralNetSimComponent;

  private prevTime: number;

  public images: ImageObject[] = [];

  public stage: number = 0;
  public epoch: number = 0;
  public step: number = -1;
  public delayFactor: number = 2;
  private skip: number = 1;

  public ratings: number[] = [-1,-1,-1,-1,-1,-1,-1,-1];

  public targetAccuracy: number;
  public accuracy: number = 0;

  private worldFormular: number[][] = [[0,0,0],[0,0,0],[0,0,0]];

  constructor(private router: Router, private imageService: ImageService) { }

  public ngOnInit(): void {
    this.targetAccuracy = Math.trunc(Math.random() * 10 + 85);
    this.worldFormular = JSON.parse(localStorage.getItem('world-formular') || '');

    this.prevTime = 0;
  }

  public async startTraining(): Promise<void> {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  private loop(time: number): void {
    // update stage value and check for halts
    if (!this.updateStage()) {
      return;
    }

    // repaint neural net
    this.neuralNet.loop(time);

    const elapsed = time - this.prevTime;

    let iterateStep: boolean = false;
    switch (this.step) {
      case -1:
        iterateStep = true;
        break;
      case 0:
        this.updateImages();
        iterateStep = true;
        break;
      case 1:
        if (elapsed < 1000*this.delayFactor) {
          break;
        }
        if (this.epoch < 10) {
          this.neuralNet.showPulse();
        }
        iterateStep = true;
        break;
      case 2:
        if (elapsed < 1000*this.delayFactor) {
          break;
        }
        if (this.epoch < 10) {
          this.generateRatings();
        }
        iterateStep = true;
        break;
      case 3:
        if (elapsed < 2000*this.delayFactor) {
          break;
        }
        this.weltformel_2_0();
        iterateStep = true;
        break;
      case 4:
        if (elapsed < 1000*this.delayFactor) {
          break;
        }
        this.neuralNet.update(this.epoch);
        iterateStep = true;
        break;
      case 5:
        if (elapsed < 1000*this.delayFactor) {
          break;
        }
        iterateStep = true;
        break;
    }

    if (iterateStep) {
      this.step++;
      if (this.step > 5) {
        this.resetRatings();
        this.step = 0;
        this.epoch += this.skip;
        this.updateParameters()
      }
      this.prevTime = time;
    }

    window.requestAnimationFrame(this.loop.bind(this));
  }

  private updateParameters(): void {
    if (this.epoch === 3) {
      this.delayFactor = 1;
    } else if (this.epoch === 10) {
      this.delayFactor = 0.1;
    } else if (this.epoch === 25) {
      this.delayFactor = 0.01;
    } else if (this.epoch === 200) {
      this.delayFactor = 0;
      this.skip = 5;
    }
  }

  private updateStage(): boolean {
    if (this.stage === 0) {
      this.stage = 1;
    } else if (this.stage === 1 && this.epoch === 3) {
      this.step = -1;
      this.stage = 2;
      return false;
    } else if (this.stage === 2 && this.epoch === 3) {
      this.stage = 3;
    } else if (this.stage === 3 && this.epoch >= 1000) {
      this.stage = 4;
      return false;
    }
    return true;
  }

  private updateImages(): void {
    this.images = this.imageService.getRandomImages(8);
  }

  public getStepLabel(): string {
    switch (this.step) {
      case -1:
        return 'Training gestoppt.'
      case 0:
        return 'Traningsdaten laden...';
      case 1:
        return 'Traningsdaten laden...';
      case 2:
        return 'Traningsdaten klassifizieren...';
      case 3:
        return 'Ergebnisse auswerten...';
      case 4:
        return 'Neuronales Netz anpassen...';
      case 5:
        return 'Epoche abgeschlossen!'
    }
    return "N/A";
  }

  private weltformel_2_0(): void {
    let sumWF = 0;
    this.worldFormular.forEach(i => {
      sumWF += i.reduce((partialSum, a) => partialSum + Math.abs(a), 0);
    });

    const s = -0.04 * sumWF + 0.95;
    const r = 0.1;

    this.accuracy = ((s-r) * (Math.log(this.epoch)/Math.log(1000)) + r) * 100;
  }

  private resetRatings() {
    this.ratings = [-1,-1,-1,-1,-1,-1,-1,-1];
  }

  private generateRatings() {
    this.ratings = [];
    for (let i = 0; i < 8; i++) {
      const rand = Math.random() * 3.5;
      const normedAccuracy = this.accuracy / 50;
      const rating = Math.trunc(rand - normedAccuracy);
      this.ratings.push(Math.min(Math.max(0, rating), 1));
    }
  }

  public continue(): void {
    void this.router.navigate(['/data-grouping']);
  }
}
