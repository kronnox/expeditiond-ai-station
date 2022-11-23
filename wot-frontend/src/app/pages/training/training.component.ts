import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ImageService} from "../../shared/image.service";
import {ImageObject} from "../../drag-and-drop/model/image/image-object";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {NeuralNetSimComponent} from "./neural-net-sim/neural-net-sim.component";
import {Router} from "@angular/router";
import {WotSuccessOverlayComponent} from "../../common/layout/wot-success-overlay/wot-success-overlay.component";
import { WotPopoverComponent } from 'src/app/common/popover/wot-popover/wot-popover.component';

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

 
  @ViewChild('popover1') public popover1: WotPopoverComponent;
  @ViewChild('popover2') public popover2: WotPopoverComponent;
  @ViewChild('popover3') public popover3: WotPopoverComponent;
  @ViewChild('popover4') public popover4: WotPopoverComponent;
  @ViewChild('popover5') public popover5: WotPopoverComponent;
  @ViewChild('popover6') public popover6: WotPopoverComponent;
  @ViewChild('popover7') public popover7: WotPopoverComponent;
 
  @ViewChild('popoverTarget1') popoverTarget1: ElementRef;
  @ViewChild('popoverTarget2') popoverTarget2: ElementRef;
  @ViewChild('popoverTarget3') popoverTarget3: ElementRef;
  @ViewChild('popoverTarget4') popoverTarget4: ElementRef;
  @ViewChild('popoverTarget5') popoverTarget5: ElementRef;
  @ViewChild('popoverTarget6') popoverTarget6: ElementRef;
  @ViewChild('popoverTarget7') popoverTarget7: ElementRef;

  private descriptions: string[] = [
    '➀ Ein Set aus Bildern wird geladen.',
    '➁ Das Neuronale Netzwerk berechnet, um welches Motiv es sich vermutlich handelt.',
    '➂ Das Ergebnis des Netzwerks wird mit der Klassifizierung abgeglichen: Grün = KI hat das Bild der richtigen Kategorie zugeordnet, Rot = KI hat das Bild falsch zugeordnet.',
    '➃ Das Neuronale Netz wird angepasst: Verbindungen zwischen Neuronen, die zu richtigen Lösungen geführt haben, werden stärker, andere schwächer.',
    '🛈 Die Schritte 1 bis 4 werden 1000x wiederholt. Die Wiederholungen heißen Epochen. Je öfter man etwas wiederholt, desto besser trainiert man es! Das ist beim Menschen so, und auch bei der KI.',
    '🛈 Die Genauigkeit des Neuronalen Netzwerks steigt mit zunehmendem Training.',
    '🛈 Das Neuronale Netz ist unserem Gehirn nachempfunden. Auch beim menschlichen Gehirn werden Verbindungen zwischen Neuronen, die oft genutzt werden, immer stärker und andere dafür schwächer. Egal, ob wir eine Sprache lernen, ein Instrument üben oder ein Spiel immer wieder zocken. So werden wir immer besser. Genauso ist es bei der KI, die die Bildererkennung trainiert.'
  ];

  constructor(private router: Router, private imageService: ImageService) { }

  public ngOnInit(): void {
    this.targetAccuracy = Math.trunc(Math.random() * 10 + 85);
    this.worldFormular = JSON.parse(localStorage.getItem('world-formular') || '');

    this.prevTime = 0;

    //void this.startTraining();
  }

  // Show all Popups
  // public ngAfterViewInit(): void {

  //   this.showPopup(0);
  //   this.showPopup(5);
  //   this.showPopup(6);
  //   this.showPopup(7);
  // }

  public async startTraining(): Promise<void> {
    window.requestAnimationFrame(this.loop.bind(this));
    if (this.epoch === 3) {
      this.showPopup(0);
    }
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
        if (this.epoch < 3) {
          this.showPopup(1);
        }
        break;
      case 1:
        if (elapsed < 1000*this.delayFactor) {
          break;
        }
        if (this.epoch < 3) {
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
        if (this.epoch < 3) {
          this.showPopup(2);
        }
        iterateStep = true;
        break;
      case 3:
        if (elapsed < 2000*this.delayFactor) {
          break;
        }
        if (this.epoch < 3) {
          this.showPopup(3);
        }
        this.weltformel_2_0();
        iterateStep = true;
        break;
      case 4:
        if (elapsed < 1000*this.delayFactor) {
          break;
        }
        if (this.epoch < 3) {
          this.showPopup(4);
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
        if (this.epoch + this.skip > 1000){
          this.epoch = 1000
        } else {
          this.epoch += this.skip;
        }
        this.updateParameters()
      }
      this.prevTime = time;
    }

    window.requestAnimationFrame(this.loop.bind(this));
  }

  private updateParameters(): void {
    if (this.epoch === 3) {      
      this.delayFactor = 0.5;      
    } else if (this.epoch === 4){
      this.showPopup(5);
    } else if (this.epoch === 10) { 
      this.showPopup(6);     
      this.delayFactor = 0.1;
    } else if (this.epoch === 25) {
      this.showPopup(7);
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
      this.setAllPopoversInvisible();
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
        return 'Trainingsdaten laden...';
      case 1:
        return 'Trainingsdaten laden...';
      case 2:
        return 'Trainingsdaten klassifizieren...';
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

    this.accuracy = Math.max(0, ((s-r) * (Math.log(this.epoch)/Math.log(1000)) + r) * 100);
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

  private setAllPopoversGrey(): void {
    this.popover1.setGrey();
    this.popover2.setGrey();
    this.popover3.setGrey();
    this.popover4.setGrey();
    this.popover5.setGrey();
    this.popover6.setGrey();
    this.popover7.setGrey();
  }

  private setAllPopoversInvisible(): void {
    this.popover1.setInvisible();
    this.popover2.setInvisible();
    this.popover3.setInvisible();
    this.popover4.setInvisible();
    this.popover5.setInvisible();
    this.popover6.setInvisible();
    this.popover7.setInvisible();
  }

  public showPopup(i: number): void {
    switch ( i ) {
      case 0:
        // show 1-4
        this.popover1.setVisible(this.popoverTarget1.nativeElement, this.descriptions[0], 1 );  
        this.popover2.setVisible(this.popoverTarget2.nativeElement, this.descriptions[1], 2);  
        this.popover3.setVisible(this.popoverTarget3.nativeElement, this.descriptions[2], 3);
        this.popover4.setVisible(this.popoverTarget4.nativeElement, this.descriptions[3], 4);
        break;
      case 1:
        this.setAllPopoversGrey();
        this.popover1.setVisible(this.popoverTarget1.nativeElement, this.descriptions[i-1], i);
        break;
      case 2:
        this.setAllPopoversGrey();
        this.popover2.setVisible(this.popoverTarget2.nativeElement, this.descriptions[i-1], i);
        break;
      case 3:
        this.setAllPopoversGrey();
        this.popover3.setVisible(this.popoverTarget3.nativeElement, this.descriptions[i-1], i);
        break;
      case 4:
        this.setAllPopoversGrey();
        this.popover4.setVisible(this.popoverTarget4.nativeElement, this.descriptions[i-1], i);
        break;
      case 5:
        this.popover5.setVisible(this.popoverTarget5.nativeElement, this.descriptions[i-1], i);
        break;
      case 6:
        this.popover6.setVisible(this.popoverTarget6.nativeElement, this.descriptions[i-1], i);
        break;
      case 7:
        this.popover7.setVisible(this.popoverTarget7.nativeElement, this.descriptions[i-1], i);
        break;
      default:
        //
        break;
    }
    
  }
}
