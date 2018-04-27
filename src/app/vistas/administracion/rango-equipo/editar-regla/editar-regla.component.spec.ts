import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReglaComponent } from './editar-regla.component';

describe('EditarReglaComponent', () => {
  let component: EditarReglaComponent;
  let fixture: ComponentFixture<EditarReglaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarReglaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReglaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
