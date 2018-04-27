import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAlertPlanesLibresComponent } from './app-alert-planes-libres.component';

describe('AppAlertPlanesLibresComponent', () => {
  let component: AppAlertPlanesLibresComponent;
  let fixture: ComponentFixture<AppAlertPlanesLibresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAlertPlanesLibresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAlertPlanesLibresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
