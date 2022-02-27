import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotRowComponent } from './wot-row.component';

describe('WotRowComponent', () => {
  let component: WotRowComponent;
  let fixture: ComponentFixture<WotRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
