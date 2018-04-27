import { TestBed, inject } from '@angular/core/testing';

import { RangoEquipoService } from './rango-equipo.service';

describe('RangoEquipoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RangoEquipoService]
    });
  });

  it('should be created', inject([RangoEquipoService], (service: RangoEquipoService) => {
    expect(service).toBeTruthy();
  }));
});
