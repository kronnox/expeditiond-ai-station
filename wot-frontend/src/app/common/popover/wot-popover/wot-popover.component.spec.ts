import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotPopoverComponent } from './wot-popover.component';

describe('WotPopoverComponent', () => {
  let component: WotPopoverComponent;
  let fixture: ComponentFixture<WotPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
