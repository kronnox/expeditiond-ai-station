import {AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {fromEvent, mergeWith, Observable, pairwise, switchMap, takeUntil} from "rxjs";
import {Vector} from "../model/vector/vector";
import {Path} from "../model/path/path";
import {Stroke} from "../model/stroke/stroke";

@Component({
  selector: 'ngx-drawing-canvas',
  templateUrl: './ngx-drawing-canvas.component.html',
  styleUrls: ['./ngx-drawing-canvas.component.scss']
})
export class NgxDrawingCanvasComponent implements AfterViewInit, DoCheck {

  @ViewChild('canvas') public canvas!: ElementRef;

  @Input() public width: string = '400';
  @Input() public height: string = '400';
  public realWidth: number;
  public realHeight: number;

  @Input() public strokeColor: string = '#000';
  @Input() public strokeWidth = 5;

  @Input() public backgroundColor: string = '#fff';

  private cx!: CanvasRenderingContext2D;

  private currentStroke: Stroke = new Stroke();
  private strokes: Stroke[] = [];
  private redoStrokes: Stroke[] = [];

  public empty: boolean = true;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = <CanvasRenderingContext2D>canvasEl.getContext('2d');

    this.updateSize();

    this.cx.lineWidth = this.strokeWidth;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.strokeColor;
    this.clearCanvas();
    this.captureEvents(canvasEl);
  }

  ngDoCheck(): void {
    this.empty = this.strokes.length === 0;
    console.log(this.empty);
  }

  private updateSize(): void {
    if (!isNaN(+this.width)) {
      this.realWidth = +this.width;
    } else if (this.width.endsWith('%')) {
      const val: number = +this.width.substring(0, this.width.length-1);
      if (isNaN(val)) throw new Error('Canvas width is not valid.')
      this.cx.canvas.style.width = this.width;
      this.cx.canvas.style.height = this.height;
      this.realWidth  = this.cx.canvas.offsetWidth;
      this.realHeight = this.cx.canvas.offsetHeight;
    }
    if (!isNaN(+this.height)) {
      this.realHeight = +this.height;
    } else if (this.height.endsWith('%')) {
      const val: number = +this.height.substring(0, this.height.length-1);
      if (isNaN(val)) throw new Error('Canvas width is not valid.')
      this.cx.canvas.style.width = this.width;
      this.cx.canvas.style.height = this.height;
      this.realWidth  = this.cx.canvas.offsetWidth;
      this.realHeight = this.cx.canvas.offsetHeight;
    }
    this.cx.canvas.width = this.realWidth;
    this.cx.canvas.height = this.realHeight;
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    const $pointerDown = fromEvent(canvasEl, 'pointerdown');
    const $pointerUp = fromEvent(canvasEl, 'pointerup').pipe(mergeWith(fromEvent(canvasEl, 'pointerleave')));
    const $pointerMove = $pointerDown.pipe(
      switchMap((e) => {
        return fromEvent(canvasEl, 'pointermove')
          .pipe(
            // @ts-ignore
            takeUntil($pointerUp),
            pairwise()
          ) as Observable<[MouseEvent, MouseEvent]>
      })
    );

    $pointerUp.subscribe(() => {
      if (this.currentStroke.paths.length < 1) return;
      this.strokes.push(this.currentStroke);
      this.currentStroke = new Stroke();
    });

    $pointerMove.subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = canvasEl.getBoundingClientRect();

      const prevPos: Vector = new Vector(res[0].clientX - rect.left, res[0].clientY - rect.top);
      const currentPos: Vector = new Vector(res[1].clientX - rect.left, res[1].clientY - rect.top);
      const path: Path = new Path(prevPos, currentPos);

      this.currentStroke.push(path);
      this.redoStrokes = [];

      this.drawOnCanvas(path);
    });
  }

  public clear(): void {
    this.clearCanvas();
    this.strokes = [];
    this.redoStrokes = [];
  }

  public clearCanvas(): void {
    this.cx.clearRect(0, 0, this.realWidth, this.realHeight);
    this.cx.fillStyle = this.backgroundColor;
    this.cx.fillRect(0, 0, this.realWidth, this.realHeight);
  }

  public canUndo(): boolean {
    return this.strokes.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStrokes.length > 0;
  }

  public undoLast(): void {
    if (this.strokes.length < 1) return;

    this.clearCanvas();
    this.redoStrokes.push(this.strokes[this.strokes.length-1]);
    this.strokes.pop();
    this.redrawPaths();
  }

  public redoLast(): void {
    if (this.redoStrokes.length < 1) return;

    this.clearCanvas();
    this.strokes.push(this.redoStrokes[this.redoStrokes.length-1]);
    this.redoStrokes.pop();
    this.redrawPaths();
  }

  private redrawPaths(): void {
    this.strokes.forEach(s => s.paths.forEach(p => this.drawOnCanvas(p)));
  }

  private drawOnCanvas(path: Path): void {
    if (!this.cx) return;

    this.cx.beginPath();
    this.cx.moveTo(path.anchorA.x, path.anchorA.y);
    this.cx.lineTo(path.anchorB.x, path.anchorB.y);
    this.cx.stroke();
  }

}

