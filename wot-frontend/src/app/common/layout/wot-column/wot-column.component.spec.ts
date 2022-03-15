import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotColumnComponent } from './wot-column.component';

describe('WotColumnComponent', () => {
  let component: WotColumnComponent;
  let fixture: ComponentFixture<WotColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
