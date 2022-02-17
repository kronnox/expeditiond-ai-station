import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGroupingComponent } from './data-grouping.component';

describe('DataGroupingComponent', () => {
  let component: DataGroupingComponent;
  let fixture: ComponentFixture<DataGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGroupingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
