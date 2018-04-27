import { TestBed, inject } from '@angular/core/testing';

import { AdminPlanesLibresService } from './admin-planes-libres.service';

describe('AdminPlanesLibresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPlanesLibresService]
    });
  });

  it('should be created', inject([AdminPlanesLibresService], (service: AdminPlanesLibresService) => {
    expect(service).toBeTruthy();
  }));
});
