import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMatrizComponent } from './eliminar-matriz.component';

describe('EliminarMatrizComponent', () => {
  let component: EliminarMatrizComponent;
  let fixture: ComponentFixture<EliminarMatrizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarMatrizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
