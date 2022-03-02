import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotContainerComponent } from './wot-container.component';

describe('WotContainerComponent', () => {
  let component: WotContainerComponent;
  let fixture: ComponentFixture<WotContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
