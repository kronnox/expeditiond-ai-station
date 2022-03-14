import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotProgressBarComponent } from './wot-progress-bar.component';

describe('WotProgressBarComponent', () => {
  let component: WotProgressBarComponent;
  let fixture: ComponentFixture<WotProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
