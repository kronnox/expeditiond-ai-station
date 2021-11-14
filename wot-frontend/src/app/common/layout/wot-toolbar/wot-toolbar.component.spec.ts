import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WotToolbarComponent} from './wot-toolbar.component';

describe('WotToolbarComponent', () => {
  let component: WotToolbarComponent;
  let fixture: ComponentFixture<WotToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
