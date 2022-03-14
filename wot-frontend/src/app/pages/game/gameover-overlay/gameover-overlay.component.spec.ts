import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameoverOverlayComponent } from './gameover-overlay.component';

describe('GameoverOverlayComponent', () => {
  let component: GameoverOverlayComponent;
  let fixture: ComponentFixture<GameoverOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameoverOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameoverOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
