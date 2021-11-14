import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WotHeaderComponent} from './wot-header.component';

describe('WotHeaderComponent', () => {
  let component: WotHeaderComponent;
  let fixture: ComponentFixture<WotHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
