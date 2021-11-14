import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WotHeaderTitleComponent} from './wot-header-title.component';

describe('WotHeaderTitleComponent', () => {
  let component: WotHeaderTitleComponent;
  let fixture: ComponentFixture<WotHeaderTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotHeaderTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotHeaderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
