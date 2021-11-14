import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxDrawingCanvasComponent} from './ngx-drawing-canvas.component';

describe('NgxDrawingCanvasComponent', () => {
  let component: NgxDrawingCanvasComponent;
  let fixture: ComponentFixture<NgxDrawingCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDrawingCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDrawingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
