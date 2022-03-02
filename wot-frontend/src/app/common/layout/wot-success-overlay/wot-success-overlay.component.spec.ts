import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotSuccessOverlayComponent } from './wot-success-overlay.component';

describe('WotSuccessOverlayComponent', () => {
  let component: WotSuccessOverlayComponent;
  let fixture: ComponentFixture<WotSuccessOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotSuccessOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotSuccessOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
