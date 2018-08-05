import { TestBed, inject } from '@angular/core/testing';

import { FlatService } from './flat.service';

describe('FlatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlatService]
    });
  });

  it('should be created', inject([FlatService], (service: FlatService) => {
    expect(service).toBeTruthy();
  }));
});
