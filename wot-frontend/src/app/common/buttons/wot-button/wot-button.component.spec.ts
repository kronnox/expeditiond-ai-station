import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WotButtonComponent} from './wot-button.component';

describe('WotButtonComponent', () => {
  let component: WotButtonComponent;
  let fixture: ComponentFixture<WotButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
