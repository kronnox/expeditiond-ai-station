import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLabelingComponent } from './data-labeling.component';

describe('DataLabelingComponent', () => {
  let component: DataLabelingComponent;
  let fixture: ComponentFixture<DataLabelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLabelingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLabelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
