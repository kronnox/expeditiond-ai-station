import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralNetSimComponent } from './neural-net-sim.component';

describe('NeuralNetSimComponent', () => {
  let component: NeuralNetSimComponent;
  let fixture: ComponentFixture<NeuralNetSimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuralNetSimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuralNetSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
