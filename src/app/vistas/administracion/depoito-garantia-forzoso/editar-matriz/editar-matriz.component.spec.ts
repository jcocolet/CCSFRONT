import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMatrizComponent } from './editar-matriz.component';

describe('EditarMatrizComponent', () => {
  let component: EditarMatrizComponent;
  let fixture: ComponentFixture<EditarMatrizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMatrizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
