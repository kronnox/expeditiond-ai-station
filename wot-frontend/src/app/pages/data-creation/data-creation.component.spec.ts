import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataCreationComponent} from './data-creation.component';

describe('DataCreationComponent', () => {
  let component: DataCreationComponent;
  let fixture: ComponentFixture<DataCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
