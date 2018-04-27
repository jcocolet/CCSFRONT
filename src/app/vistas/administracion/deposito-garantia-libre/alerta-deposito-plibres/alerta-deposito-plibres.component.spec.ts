import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaDepositoPlibresComponent } from './alerta-deposito-plibres.component';

describe('AlertaDepositoPlibresComponent', () => {
  let component: AlertaDepositoPlibresComponent;
  let fixture: ComponentFixture<AlertaDepositoPlibresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaDepositoPlibresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaDepositoPlibresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
