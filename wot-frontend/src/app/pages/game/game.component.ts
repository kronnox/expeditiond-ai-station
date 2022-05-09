import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BackendService} from 'src/app/shared/backend.service';
import {SpaceObject} from './models/space-object.model';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";
import {GameObject} from "./models/game-object.model";
import {Star} from "./models/star.model";
import {Truck} from "./models/truck.model";
import {GameConfig} from "./game-config";
import { ImageService } from 'src/app/shared/image.service';
import { ImageObject } from 'src/app/drag-and-drop/model/image/image-object';
import { WotSuccessOverlayComponent } from 'src/app/common/layout/wot-success-overlay/wot-success-overlay.component';
import { WotPopoverComponent } from 'src/app/common/popover/wot-popover/wot-popover.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas!: ElementRef;
  @ViewChild('popover') public popover: WotPopoverComponent;
  @ViewChild('canvasContainer') public canvasContainer: ElementRef;

  private ctx!: CanvasRenderingContext2D;
  private canvasEl: HTMLCanvasElement;

  private _width: number;
  private _height: number;
  private _centerX: number;
  private _centerY: number;

  private bgObjects: GameObject[] = [];
  private _truck: Truck;
  private objects: GameObject[] = [];

  private _radarAngle: number = Math.PI;

  private _currentShakeFactor: number = 0;

  private prevTime: number;
  private prevSecond: number = 0;
  private fps: number = 0;

  private worldFormular: number[][];

  private customImages: ImageObject[] = [];

  private grouping: number[];

  public demage: number[][] = [
    [0,1,1],
    [1,0,1],
    [0,0,0],
    [1,0,1],
    [1,1,0],
    [1,1,0],
    [0,0,0],
    [0,1,1],
    [1,0,1]
  ];

  public survivedObjects: number = 0;

  public gamestatus: number = 0; //0: running, 1: win, 2: loss

  constructor(protected backendService: BackendService, protected imageService: ImageService) {
      this.worldFormular = JSON.parse(localStorage.getItem('world-formular') || '');
  }

  public ngAfterViewInit() {
      this.grouping = JSON.parse(localStorage.getItem('grouping') || '');

      this.canvasEl = this.canvas.nativeElement;
      this.ctx = <CanvasRenderingContext2D>this.canvasEl.getContext('2d');

      this.canvasEl.width = window.innerWidth;
      this.canvasEl.height = window.innerHeight;

      this._width = this.canvasEl.width;
      this._height = this.canvasEl.height;
      this._centerX = this._width/2;
      this._centerY = this._height/2;

      this.popover.setVisible(this.canvasContainer.nativeElement, 'Hier könnt ihr eigene Objekte zeichnen, um euer Erkennungssystem zu testen');

      this.prevTime = 0;

      this._truck = new Truck(this);
      this.initStars(2000);
      window.requestAnimationFrame(this.loop.bind(this));
      this.spawnSpaceObjects();
  }

  private loop(time: number): void {
      const elapsed = time - this.prevTime;
      if (elapsed > 12.67) {
          this.prevTime = time;

          this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)

          const totalSeconds = Math.round(time / 100);
          if (totalSeconds > this.prevSecond) {
              this.prevSecond = totalSeconds;
              this.fps = Math.round(1 / (elapsed / 1000));
          }

          this.preTick(elapsed);
          this.tick(elapsed);
          this.postTick(elapsed);
      }

      window.requestAnimationFrame(this.loop.bind(this));

      if(this.truck.health <= 0) {
          this.gamestatus = 2;
      } else if (this.survivedObjects >= 30) {
          this.gamestatus = 1;
      }

  }

  private preTick(delta: number): void {
      this.ctx.save();

      // shake
      this.ctx.translate(Math.random() * this._currentShakeFactor, Math.random() * this._currentShakeFactor);
      if (this._currentShakeFactor > 0) {
          this._currentShakeFactor -= 0.4;
      }
  }

  private tick(delta: number): void {
      // background
      this.bgObjects.forEach((obj, i, o) => {
          obj.update(delta);
          if (!obj.isActive()) {
              o.splice(i, 1);
          }
          obj.draw(this.ctx)
      });

      if (this.gamestatus!=0){
        localStorage.setItem('win', this.gamestatus.toString());
        return;
      }

      // radar
      const imgRadar = new Image();
      imgRadar.src = 'assets/game/radar.png';
      this.ctx.save();
      this.ctx.translate(this._truck.x , this._truck.y);
      this.ctx.rotate(this._radarAngle -= 0.04);
      if (this._radarAngle < -Math.PI) {
          this._radarAngle += 2*Math.PI;
      }
      this.ctx.drawImage(imgRadar, -GameConfig.radarRange, -GameConfig.radarRange, GameConfig.radarRange * 2, GameConfig.radarRange * 2);
      this.ctx.restore();

      // truck
      this._truck.draw(this.ctx);

      // space objects
      this.objects.forEach((obj, i, o) => {
          obj.update(delta);
          if (!obj.isActive()) {
              o.splice(i, 1);
          }
          obj.draw(this.ctx)
      });
  }

  private postTick(delta: number): void {
      this.ctx.restore();

      this.ctx.fillStyle = 'hsla(0,0%,100%,0.4)';
      this.ctx.fillRect(0, 0, 100, 30);
      this.ctx.font = '15px Mono';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText("FPS: " + this.fps, 10, 20);
  }

  private initStars(count: number): void {
      for (let i = 0; i < count; i++){
          this.bgObjects.push(new Star(this));
      }
  }

  private spawnSpaceObjects(){
      setInterval(() => {
          const velocity = Math.random() + 0.5;

          let x: number;
          let y: number;
          if (Math.random() < 0.5) {
              x = Math.random() < 0.5 ? 0 - GameConfig.spaceObjectSize : this.canvasEl.width + GameConfig.spaceObjectSize;
              y = Math.random() * this.canvasEl.height;
          } else {
              x = Math.random() * this.canvasEl.width;
              y = Math.random() < 0.5 ? 0 - GameConfig.spaceObjectSize : this.canvasEl.height + GameConfig.spaceObjectSize;
          }
          const angle = Math.atan2(this._truck.y - y, this._truck.x - x);
          const vx = Math.cos(angle)*velocity;
          const vy = Math.sin(angle)*velocity;

          let img: ImageObject;
          if(this.customImages.length == 0){
              img = this.imageService.getRandomImage();
          } else {
              img = this.customImages[0];
              this.customImages.splice(0,1);
          }

          const spaceObject = new SpaceObject(this, x, y, vx, vy, img, GameConfig.spaceObjectSize, GameConfig.spaceObjectSize);
          this.predictObject(spaceObject).then(res => {
              this.objects.push(spaceObject);
              this.survivedObjects++;
          });
    }, 2000)
  }

  private async predictObject(spaceObject: SpaceObject){
      await fetch(spaceObject.imageObject.imagePath).then(r => r.blob()).then(blob => this.backendService.predictBlob(blob, spaceObject.imageObject.custom)).then(res => {
          const tempClass = res.indexOf(Math.max(...res));
          for(let i = 0; i < res.length; i++) {
              res[i] = res[i] + this.worldFormular[tempClass][i];
          }
          const result = this.normalize(res);
          let sum = 0;
          for(let i = 0; i < result.length; i++){
              sum += result[i];
          }
          const confidence = Math.max(...result);
          const classId = result.indexOf(confidence);
          spaceObject.imageObject.prediction = result;
          spaceObject.imageObject.predictedClass = classId;
          spaceObject.imageObject.label = (this.backendService.classes[classId] + " " + (confidence*100).toFixed(2) + "%");
          if(spaceObject.imageObject.custom) {
            spaceObject.imageObject.labeledClass = classId
          }

          spaceObject.action = this.grouping[classId];
    });
  }

  private normalize(array: number[]): number[] {
    for(let i = 0; i < array.length; i++){
        array[i] = (array[i] < 0 ? 0 : array[i]);
    }
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    for(let i = 0; i < array.length; i++){
        array[i] = array[i] / sum;
    }
    return array;
  }

  public saveCanvas(canvas: NgxDrawingCanvasComponent): void {
      this.customImages.push(new ImageObject(canvas.canvas.nativeElement.toDataURL("image/png"), true));
      canvas.clear();
  }

  public continue(): void {

  }

  public applyShake(): void {
      this._currentShakeFactor = GameConfig.shakeFactor;
  }

  public spawnObject(obj: GameObject): void {
      this.objects.push(obj);
  }

  get height(): number {
      return this._height;
  }

  get width(): number {
      return this._width;
  }

  get centerY(): number {
      return this._centerY;
  }

  get centerX(): number {
      return this._centerX;
  }

  get radarAngle(): number {
      return this._radarAngle;
  }

  get currentShakeFactor(): number {
      return this._currentShakeFactor;
  }

  get truck(): Truck {
      return this._truck;
  }
}
