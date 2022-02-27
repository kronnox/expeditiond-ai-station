import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotStepTitleComponent } from './wot-step-title.component';

describe('WotStepTitleComponent', () => {
  let component: WotStepTitleComponent;
  let fixture: ComponentFixture<WotStepTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotStepTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotStepTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
