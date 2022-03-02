import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotStepInfoComponent } from './wot-step-info.component';

describe('WotStepInfoComponent', () => {
  let component: WotStepInfoComponent;
  let fixture: ComponentFixture<WotStepInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotStepInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotStepInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
