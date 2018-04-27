import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonarMatrizComponent } from './clonar-matriz.component';

describe('ClonarMatrizComponent', () => {
  let component: ClonarMatrizComponent;
  let fixture: ComponentFixture<ClonarMatrizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClonarMatrizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClonarMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
