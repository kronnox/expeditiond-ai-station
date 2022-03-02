import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BackendService} from 'src/app/shared/backend.service';
import {SpaceObject} from './models/space-object.model';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";
import {GameObject} from "./models/game-object.model";
import {Star} from "./models/star.model";
import {Nebula} from "./models/nebula.model";
import {Truck} from "./models/truck.model";
import {GameConfig} from "./game-config";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas!: ElementRef;

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

  private imagePaths: string[] = ['assets/game/objects/Asteroid/1643121594739.png', 'assets/game/objects/Asteroid/1643121624151.png', 'assets/game/objects/Asteroid/1643121631723.png', 'assets/game/objects/Asteroid/1643204811895.png', 'assets/game/objects/Asteroid/1643208419666.png', 'assets/game/objects/Asteroid/1643208419750.png', 'assets/game/objects/Asteroid/1643208419777.png', 'assets/game/objects/Asteroid/1643208419888.png', 'assets/game/objects/Asteroid/1643208419999.png', 'assets/game/objects/Asteroid/1643208656695.png', 'assets/game/objects/Astronaut/1637760284691.png', 'assets/game/objects/Astronaut/1643203956591.png', 'assets/game/objects/Astronaut/1643203979031.png', 'assets/game/objects/Astronaut/1643204023982.png', 'assets/game/objects/Astronaut/1643204042596.png', 'assets/game/objects/Astronaut/1643204117649.png', 'assets/game/objects/Astronaut/1643313993186.png', 'assets/game/objects/Astronaut/1643314253862.png', 'assets/game/objects/Astronaut/obj-13.png', 'assets/game/objects/Astronaut/obj-7 (1).png', 'assets/game/objects/Envelope/6001.png', 'assets/game/objects/Envelope/6004.png', 'assets/game/objects/Envelope/6005.png', 'assets/game/objects/Envelope/6006.png', 'assets/game/objects/Envelope/6007.png', 'assets/game/objects/Envelope/6011.png', 'assets/game/objects/Envelope/6013.png', 'assets/game/objects/Envelope/6014.png', 'assets/game/objects/Envelope/6016.png', 'assets/game/objects/Envelope/6017.png', 'assets/game/objects/FlyingSaucer/6963.png', 'assets/game/objects/FlyingSaucer/6964.png', 'assets/game/objects/FlyingSaucer/6965.png', 'assets/game/objects/FlyingSaucer/6968.png', 'assets/game/objects/FlyingSaucer/6969.png', 'assets/game/objects/FlyingSaucer/6991.png', 'assets/game/objects/FlyingSaucer/6999.png', 'assets/game/objects/FlyingSaucer/7011.png', 'assets/game/objects/FlyingSaucer/7014.png', 'assets/game/objects/FlyingSaucer/7026.png', 'assets/game/objects/Lootbox/1637756179698.png', 'assets/game/objects/Lootbox/1637756207960.png', 'assets/game/objects/Lootbox/1637756220224.png', 'assets/game/objects/Lootbox/1637756285531.png', 'assets/game/objects/Lootbox/1637759348314.png', 'assets/game/objects/Lootbox/1637759464591.png', 'assets/game/objects/Lootbox/1637759687879.png', 'assets/game/objects/Lootbox/1643204416091.png', 'assets/game/objects/Lootbox/1643204503131.png', 'assets/game/objects/Lootbox/obj-3 (1).png', 'assets/game/objects/RaceCar/13361.png', 'assets/game/objects/RaceCar/13362.png', 'assets/game/objects/RaceCar/13363.png', 'assets/game/objects/RaceCar/13364.png', 'assets/game/objects/RaceCar/13384.png', 'assets/game/objects/RaceCar/13396.png', 'assets/game/objects/RaceCar/13397.png', 'assets/game/objects/RaceCar/13401.png', 'assets/game/objects/RaceCar/13402.png', 'assets/game/objects/RaceCar/13412.png', 'assets/game/objects/Satellite/14081.png', 'assets/game/objects/Satellite/14082.png', 'assets/game/objects/Satellite/14085.png', 'assets/game/objects/Satellite/14092.png', 'assets/game/objects/Satellite/14105.png', 'assets/game/objects/Satellite/14123.png', 'assets/game/objects/Satellite/14124.png', 'assets/game/objects/Satellite/14142.png', 'assets/game/objects/Satellite/1643204554630.png', 'assets/game/objects/Satellite/1643204638719.png', 'assets/game/objects/SatelliteDish/14089.png', 'assets/game/objects/SatelliteDish/14121.png', 'assets/game/objects/SatelliteDish/14126.png', 'assets/game/objects/SatelliteDish/14128.png', 'assets/game/objects/SatelliteDish/14135.png', 'assets/game/objects/SatelliteDish/14165.png', 'assets/game/objects/SatelliteDish/14167.png', 'assets/game/objects/SatelliteDish/14168.png', 'assets/game/objects/SatelliteDish/14170.png', 'assets/game/objects/SatelliteDish/14183.png', 'assets/game/objects/SpaceShuttle/15762.png', 'assets/game/objects/SpaceShuttle/15763.png', 'assets/game/objects/SpaceShuttle/15768.png', 'assets/game/objects/SpaceShuttle/15779.png', 'assets/game/objects/SpaceShuttle/15780.png', 'assets/game/objects/SpaceShuttle/15784.png', 'assets/game/objects/SpaceShuttle/15785.png', 'assets/game/objects/SpaceShuttle/15792.png', 'assets/game/objects/SpaceShuttle/15800.png', 'assets/game/objects/SpaceShuttle/15802.png'];
  private customImages: string[] = [];

  private types: number[] = [0,2,1,0,2,1,0,2,1];

  constructor(protected backendService: BackendService) { }

  public ngAfterViewInit() {
      this.canvasEl = this.canvas.nativeElement;
      this.ctx = <CanvasRenderingContext2D>this.canvasEl.getContext('2d');

      this.canvasEl.width = window.innerWidth;
      this.canvasEl.height = window.innerHeight;

      this._width = this.canvasEl.width;
      this._height = this.canvasEl.height;
      this._centerX = this._width/2;
      this._centerY = this._height/2;

      this.prevTime = 0;

      this._truck = new Truck(this);
      this.initNebula();
      this.initStars(5000);
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
      this.ctx.font = '15px Consolas';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText("FPS: " + this.fps, 10, 20);
  }

  private initStars(count: number): void {
      for (let i = 0; i < count; i++){
          this.bgObjects.push(new Star(
              this,
              Math.random()*1600-800,
              Math.random()*900-450,
              Math.random()*1000
          ));
      }
  }

    private initNebula(): void {
        this.bgObjects.push(new Nebula(this, 0));
        this.bgObjects.push(new Nebula(this, 20));
        this.bgObjects.push(new Nebula(this, 40));
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

          let img = "";
          if(this.customImages.length == 0){
              img = this.imagePaths[Math.trunc(Math.random()*this.imagePaths.length)];
          } else {
              img = this.customImages[0];
              this.customImages.splice(0,1);
          }

          const spaceObject = new SpaceObject(this, x, y, vx, vy, img, GameConfig.spaceObjectSize, GameConfig.spaceObjectSize);
          this.predictObject(spaceObject).then(res => {
              this.objects.push(spaceObject);
          });
    }, 2000)
  }

  private async predictObject(spaceObject: SpaceObject){
      await fetch(spaceObject.imagePath).then(r => r.blob()).then(blob => this.backendService.predictBlob(blob)).then(res => {
          const confidence = Math.max(...res);
          spaceObject.predConfidence = confidence.toFixed(2);
          const classId = res.indexOf(confidence);
          spaceObject.type = this.types[classId];
          spaceObject.predClass = this.backendService.classes[classId];
    });
  }

  public saveCanvas(canvas: NgxDrawingCanvasComponent): void {
      this.customImages.push(canvas.canvas.nativeElement.toDataURL("image/png"));
      canvas.clear();
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
