import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotLifeBarComponent } from './wot-life-bar.component';

describe('WotLifeBarComponent', () => {
  let component: WotLifeBarComponent;
  let fixture: ComponentFixture<WotLifeBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotLifeBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotLifeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
