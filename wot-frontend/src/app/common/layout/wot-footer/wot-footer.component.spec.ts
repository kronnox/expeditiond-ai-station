import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotFooterComponent } from './wot-footer.component';

describe('WotFooterComponent', () => {
  let component: WotFooterComponent;
  let fixture: ComponentFixture<WotFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
