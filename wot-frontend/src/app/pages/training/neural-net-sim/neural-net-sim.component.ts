import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WotSuccessOverlayComponent} from "../../../common/layout/wot-success-overlay/wot-success-overlay.component";
import {GameObject} from "../../game/models/game-object.model";
import {Truck} from "../../game/models/truck.model";
import {ImageObject} from "../../../drag-and-drop/model/image/image-object";
import {BackendService} from "../../../shared/backend.service";
import {ImageService} from "../../../shared/image.service";
import {GameConfig} from "../../game/game-config";
import {Star} from "../../game/models/star.model";
import {SpaceObject} from "../../game/models/space-object.model";
import {NgxDrawingCanvasComponent} from "../../../ngx-drawing-canvas/ngx-drawing-canvas.component";
import {Node} from "./models/node.model";
import {Edge} from "./models/edge.model";

@Component({
  selector: 'neural-net-sim',
  templateUrl: './neural-net-sim.component.html',
  styleUrls: ['./neural-net-sim.component.scss']
})
export class NeuralNetSimComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas!: ElementRef;
  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;

  @Input() public pulseDelay: number = 1;
  private pulseStage = -1;

  private ctx!: CanvasRenderingContext2D;
  private canvasEl: HTMLCanvasElement;

  private _width: number;
  private _height: number;
  private _centerX: number;
  private _centerY: number;

  private prevTime: number;
  private prevPulseTime: number;

  private spaceBetweenNodes: number;
  private layout: number[] = [3, 4, 4, 2];

  private nodes: Node[] = [];
  private edges: Edge[] = [];

  constructor(protected backendService: BackendService, protected imageService: ImageService) {

  }

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.ctx = <CanvasRenderingContext2D>this.canvasEl.getContext('2d');

    this.canvasEl.width = 600;
    this.canvasEl.height = 500;

    this._width = this.canvasEl.width;
    this._height = this.canvasEl.height;
    this._centerX = this._width/2;
    this._centerY = this._height/2;

    this.spaceBetweenNodes = this._height / 5;

    this.prevTime = -100;
    this.prevPulseTime = -100;

    // create nodes and edges
    let prevNodes: Node[] = [];
    for (let c = 0; c < this.layout.length; c++) {
      const left = (this.width / this.layout.length) * (c+0.5);
      const amount = this.layout[c];
      const nodes: Node[] = [];
      for (let r = 0; r < amount; r++) {
        const top = this.spaceBetweenNodes * (r+0.5) - this.spaceBetweenNodes * (amount)/2 + this.centerY;
        const node = new Node(left, top);
        this.nodes.push(node);
        nodes.push(node);
        prevNodes.forEach(n => this.edges.push(new Edge(n, node)));
      }
      prevNodes = nodes;
    }

    this.loop(0);
  }

  loop(time: number): void {
    const elapsed = time - this.prevTime;

    if (elapsed > 24) {
      this.prevTime = time;

      this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)

      this.preTick(elapsed);
      this.tick(elapsed);
      this.postTick(elapsed);
    }

    const elapsedPulse = time - this.prevPulseTime;
    if (this.pulseStage !== -1 && elapsedPulse > 200*this.pulseDelay) {
      if (this.pulseStage > this.layout.length) {
        this.pulseStage = -1;
        return;
      }
      this.pulseColumn(this.pulseStage);
      this.pulseStage++;
      this.prevPulseTime = time;
    }
  }

  private preTick(delta: number): void {
    this.ctx.save();
  }

  private tick(delta: number): void {
    this.edges.forEach(e => e.draw(this.ctx));
    this.nodes.forEach(n => n.draw(this.ctx));
  }

  private postTick(delta: number): void {

  }

  public update(epoch: number): void {
    this.edges.forEach(e => e.updateWeight(epoch));
  }

  public showPulse(): void {
    this.pulseStage = 0;
  }

  private pulseColumn(column: number): void {
    let totalCount = 0;

    if (column > 0) {
      // get number of node upfront
      for (let c = 0; c < column - 1; c++) {
        totalCount += this.layout[c];
      }

      // disable glow for previous row
      for (let r = 0; r < this.layout[column - 1]; r++) {
        this.nodes[totalCount + r].glow = false;
      }
      totalCount += this.layout[column - 1];
    }

    if (column < this.layout.length) {
      // enable glow for row
      for (let r = 0; r < this.layout[column]; r++) {
        this.nodes[totalCount + r].glow = true;
      }
    }
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

}
