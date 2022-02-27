import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotStepDescriptionComponent } from './wot-step-description.component';

describe('WotStepDescriptionComponent', () => {
  let component: WotStepDescriptionComponent;
  let fixture: ComponentFixture<WotStepDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotStepDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotStepDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
