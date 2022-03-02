import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotPageComponent } from './wot-page.component';

describe('WotPageComponent', () => {
  let component: WotPageComponent;
  let fixture: ComponentFixture<WotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
