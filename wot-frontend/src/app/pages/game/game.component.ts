import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { Projectile } from './projectile';
import { SpaceObject } from './space-object';
import {NgxDrawingCanvasComponent} from "../../ngx-drawing-canvas/ngx-drawing-canvas.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('canvas') public canvas!: ElementRef;

  private cx!: CanvasRenderingContext2D;
  private canvasEl: HTMLCanvasElement;

  private truck: SpaceObject;
  private spaceObjects: SpaceObject[] = [];

  private imagePaths: string[] = ['assets/game/objects/Asteroid/1643121594739.png', 'assets/game/objects/Asteroid/1643121624151.png', 'assets/game/objects/Asteroid/1643121631723.png', 'assets/game/objects/Asteroid/1643204811895.png', 'assets/game/objects/Asteroid/1643208419666.png', 'assets/game/objects/Asteroid/1643208419750.png', 'assets/game/objects/Asteroid/1643208419777.png', 'assets/game/objects/Asteroid/1643208419888.png', 'assets/game/objects/Asteroid/1643208419999.png', 'assets/game/objects/Asteroid/1643208656695.png', 'assets/game/objects/Astronaut/1637760284691.png', 'assets/game/objects/Astronaut/1643203956591.png', 'assets/game/objects/Astronaut/1643203979031.png', 'assets/game/objects/Astronaut/1643204023982.png', 'assets/game/objects/Astronaut/1643204042596.png', 'assets/game/objects/Astronaut/1643204117649.png', 'assets/game/objects/Astronaut/1643313993186.png', 'assets/game/objects/Astronaut/1643314253862.png', 'assets/game/objects/Astronaut/obj-13.png', 'assets/game/objects/Astronaut/obj-7 (1).png', 'assets/game/objects/Envelope/6001.png', 'assets/game/objects/Envelope/6004.png', 'assets/game/objects/Envelope/6005.png', 'assets/game/objects/Envelope/6006.png', 'assets/game/objects/Envelope/6007.png', 'assets/game/objects/Envelope/6011.png', 'assets/game/objects/Envelope/6013.png', 'assets/game/objects/Envelope/6014.png', 'assets/game/objects/Envelope/6016.png', 'assets/game/objects/Envelope/6017.png', 'assets/game/objects/FlyingSaucer/6963.png', 'assets/game/objects/FlyingSaucer/6964.png', 'assets/game/objects/FlyingSaucer/6965.png', 'assets/game/objects/FlyingSaucer/6968.png', 'assets/game/objects/FlyingSaucer/6969.png', 'assets/game/objects/FlyingSaucer/6991.png', 'assets/game/objects/FlyingSaucer/6999.png', 'assets/game/objects/FlyingSaucer/7011.png', 'assets/game/objects/FlyingSaucer/7014.png', 'assets/game/objects/FlyingSaucer/7026.png', 'assets/game/objects/Lootbox/1637756179698.png', 'assets/game/objects/Lootbox/1637756207960.png', 'assets/game/objects/Lootbox/1637756220224.png', 'assets/game/objects/Lootbox/1637756285531.png', 'assets/game/objects/Lootbox/1637759348314.png', 'assets/game/objects/Lootbox/1637759464591.png', 'assets/game/objects/Lootbox/1637759687879.png', 'assets/game/objects/Lootbox/1643204416091.png', 'assets/game/objects/Lootbox/1643204503131.png', 'assets/game/objects/Lootbox/obj-3 (1).png', 'assets/game/objects/RaceCar/13361.png', 'assets/game/objects/RaceCar/13362.png', 'assets/game/objects/RaceCar/13363.png', 'assets/game/objects/RaceCar/13364.png', 'assets/game/objects/RaceCar/13384.png', 'assets/game/objects/RaceCar/13396.png', 'assets/game/objects/RaceCar/13397.png', 'assets/game/objects/RaceCar/13401.png', 'assets/game/objects/RaceCar/13402.png', 'assets/game/objects/RaceCar/13412.png', 'assets/game/objects/Satellite/14081.png', 'assets/game/objects/Satellite/14082.png', 'assets/game/objects/Satellite/14085.png', 'assets/game/objects/Satellite/14092.png', 'assets/game/objects/Satellite/14105.png', 'assets/game/objects/Satellite/14123.png', 'assets/game/objects/Satellite/14124.png', 'assets/game/objects/Satellite/14142.png', 'assets/game/objects/Satellite/1643204554630.png', 'assets/game/objects/Satellite/1643204638719.png', 'assets/game/objects/SatelliteDish/14089.png', 'assets/game/objects/SatelliteDish/14121.png', 'assets/game/objects/SatelliteDish/14126.png', 'assets/game/objects/SatelliteDish/14128.png', 'assets/game/objects/SatelliteDish/14135.png', 'assets/game/objects/SatelliteDish/14165.png', 'assets/game/objects/SatelliteDish/14167.png', 'assets/game/objects/SatelliteDish/14168.png', 'assets/game/objects/SatelliteDish/14170.png', 'assets/game/objects/SatelliteDish/14183.png', 'assets/game/objects/SpaceShuttle/15762.png', 'assets/game/objects/SpaceShuttle/15763.png', 'assets/game/objects/SpaceShuttle/15768.png', 'assets/game/objects/SpaceShuttle/15779.png', 'assets/game/objects/SpaceShuttle/15780.png', 'assets/game/objects/SpaceShuttle/15784.png', 'assets/game/objects/SpaceShuttle/15785.png', 'assets/game/objects/SpaceShuttle/15792.png', 'assets/game/objects/SpaceShuttle/15800.png', 'assets/game/objects/SpaceShuttle/15802.png'];
  truckLoc:string = 'assets/game/spacetruck.png';
  spaceLoc: string = 'assets/game/space.jpg';
  private customImages: string[] = [];

  private types: number[] = [0,2,1,0,2,1,0,2,1];

  constructor(protected backendService: BackendService) { }

  ngOnInit(): void {
  }

  
  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = <CanvasRenderingContext2D>this.canvasEl.getContext('2d');

    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;

    this.truck = new SpaceObject(this.canvasEl.width/2, this.canvasEl.height/2, 0, 0, this.truckLoc, 600, 300);
    this.animate();
    this.spawnSpaceObjects();
  }

  animate(): void {
    window.requestAnimationFrame( () => this.animate());

    this.cx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)

    let background = new Image();
    background.src = this.spaceLoc;
    this.cx.drawImage(background, 0, 0, this.canvasEl.width, this.canvasEl.height);
    

    this.truck.draw(this.cx);
    this.cx.beginPath();
    this.cx.arc(this.canvasEl.width/2, this.canvasEl.height/2, 400, 0, 2 * Math.PI, false);
    this.cx.setLineDash([5, 10]);
    this.cx.lineWidth = 5;
    this.cx.strokeStyle = 'darkblue';
    this.cx.stroke();
    this.cx.setLineDash([]);
    

    this.spaceObjects.forEach((spaceObject, indexSO) => {
      spaceObject.update(this.cx);

      const dist = Math.hypot(this.truck.x - spaceObject.x, this.truck.y - spaceObject.y);
      if(spaceObject.projectile != null){
        spaceObject.projectile.update(this.cx);
        if(spaceObject.hitProjectile(spaceObject.projectile)) {
          setTimeout(() => {
            this.spaceObjects.splice(indexSO, 1);
          }, 0)
        }
      } else if (dist > 400) {
        spaceObject.detected = false;
      } else if (dist < 400 && !spaceObject.detected){
        spaceObject.detected = true;
        if(spaceObject.type === 0){
          const angle = Math.atan2(spaceObject.y - this.truck.y, spaceObject.x - this.truck.x);
    
          const vx = Math.cos(angle)*6;
          const vy = Math.sin(angle)*6;
          spaceObject.projectile = new Projectile(this.canvasEl.width/2, this.canvasEl.height/2, vx, vy);
        }
      }
      
      if(spaceObject.hitTruck(this.truck)) {
        setTimeout(() => {
          this.spaceObjects.splice(indexSO, 1);
        }, 0)
      }
    });
  }

  spawnSpaceObjects(){
    setInterval(() => {
      const width = 200;
      const height = 200;
      const velocity = Math.random() * 2 + 1;

      let x: number;
      let y: number;
      if(Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - width : this.canvasEl.width + width;
        y = Math.random() * this.canvasEl.height;
      } else {
        x = Math.random() * this.canvasEl.width;
        y = Math.random() < 0.5 ? 0 - height : this.canvasEl.height + height;
      }
      const angle = Math.atan2(this.truck.y - y, this.truck.x - x);
      const vx = Math.cos(angle)*velocity;
      const vy = Math.sin(angle)*velocity;

      let img = "";
      if(this.customImages.length == 0){
        img = this.imagePaths[Math.trunc(Math.random()*this.imagePaths.length)];
      } else {
        img = this.customImages[0];
        this.customImages.splice(0,1);
      }

      const spaceObject = new SpaceObject(x,y,vx,vy,img, width, height);
      this.predictObject(spaceObject).then(res => {
        this.spaceObjects.push(spaceObject);
      });
    }, 2000)
  }

  async predictObject(spaceObject: SpaceObject){
    await fetch(spaceObject.imagePath).then(r => r.blob()).then(blob => this.backendService.predictBlob(blob)).then(res => {
      const confidence = Math.max(...res);
      spaceObject.predConfidence = confidence.toFixed(2);
      const classId = res.indexOf(confidence);
      spaceObject.type = this.types[classId];
      spaceObject.predClass = this.backendService.classes[classId];
    });
  }

  saveCanvas(canvas: NgxDrawingCanvasComponent): void {
    this.customImages.push(canvas.canvas.nativeElement.toDataURL("image/png"));
    canvas.clear();
  }
}