import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WotSidebarComponent} from './wot-sidebar.component';

describe('WotSidebarComponent', () => {
  let component: WotSidebarComponent;
  let fixture: ComponentFixture<WotSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WotSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WotSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
