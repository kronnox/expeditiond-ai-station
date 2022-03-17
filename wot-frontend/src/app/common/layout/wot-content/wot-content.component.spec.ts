import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotContentComponent } from './wot-content.component';

describe('WotContentComponent', () => {
  let component: WotContentComponent;
  let fixture: ComponentFixture<WotContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
