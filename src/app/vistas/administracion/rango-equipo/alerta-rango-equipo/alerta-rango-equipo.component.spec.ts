import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaRangoEquipoComponent } from './alerta-rango-equipo.component';

describe('AlertaRangoEquipoComponent', () => {
  let component: AlertaRangoEquipoComponent;
  let fixture: ComponentFixture<AlertaRangoEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaRangoEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaRangoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
