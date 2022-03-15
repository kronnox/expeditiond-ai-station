import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageService} from "../../shared/image.service";
import {ImageObject} from "../../model/image/image-object";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {NeuralNetSimComponent} from "./neural-net-sim/neural-net-sim.component";

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

  public images: ImageObject[] = [];

  public stage: number = 0;
  public epoch: number = 0;
  public step: number = -1;
  public delayFactor: number = 1;
  private skip: number = 1;

  public ratings: number[] = [-1,-1,-1,-1,-1,-1,-1,-1];

  public targetAccuracy: number;
  public accuracy: number = 0;

  private worldFormular: number[][] = [[0,0,0],[0,0,0],[0,0,0]];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.targetAccuracy = Math.trunc(Math.random()*10 + 85);
    this.worldFormular = JSON.parse(localStorage.getItem('world-formular') || '');
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
        return 'Traningsdaten klassifizieren...';
      case 2:
        return 'Ergebnisse auswerten...';
      case 3:
        return 'Neuronales Netz anpassen...';
      default:
        return 'Epoche abgeschlossen!'
    }
  }

  public async startTraining(): Promise<void> {
    if (this.stage > 0) return;
    this.stage = 1;

    this.delayFactor = 2;
    while (this.epoch < 3) {
      await this.fakeTraining();
    }

    this.stage = 2;
  }

  public async continueTraining(): Promise<void> {
    if (this.stage > 2) return;
    this.stage = 3;

    this.delayFactor = 0.5;
    while (this.epoch < 1000) {
      await this.fakeTraining();

      if (this.epoch === 10) {
        this.delayFactor = 0.1;
      } else if (this.epoch === 25) {
        this.delayFactor = 0.01;
      } else if (this.epoch === 200) {
        this.delayFactor = 0;
        this.skip = 5;
      }
    }
  }

  private async fakeTraining(): Promise<void> {
    this.epoch += this.skip;
    this.step = 0;
    this.updateImages();
    await this.delay(500*this.delayFactor);
    this.step = 1;
    await this.neuralNet.showPulse(this.delayFactor);
    await this.delay(1000*this.delayFactor);
    this.step = 2;
    this.generateRatings();
    await this.delay(2000*this.delayFactor);
    this.step = 3;
    this.weltformel_2_0();
    await this.delay(1000*this.delayFactor);
    this.step = 4;
    this.neuralNet.update(this.epoch);
    await this.delay(1000*this.delayFactor);
    this.resetRatings();
  }

  private delay(ms: number): Promise<void> {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  private weltformel_2_0(): void {
    let sumWF = 0;
    this.worldFormular.forEach(i => {
      sumWF += i.reduce((partialSum, a) => partialSum + Math.abs(a), 0);
    });

    const s = -0.06875 * sumWF + 0.95;
    const r = 0.1;

    this.accuracy = ((s-r) * (Math.log(this.epoch)/Math.log(1000)) + r) * 100;
  }

  private resetRatings() {
    this.ratings = [-1,-1,-1,-1,-1,-1,-1,-1];
  }

  private generateRatings() {
    this.ratings = [];
    for (let i = 0; i < 8; i++) {
      this.ratings.push(Math.trunc(Math.random()*2));
    }
  }

  public getBorderColor(i: number) {
    switch (this.ratings[i]) {
      case 0:
        return 'var(--color-success)';
      case 1:
        return 'var(--color-danger)';
      default:
        return '';
    }
  }
}
